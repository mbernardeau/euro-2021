import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { EU_WEST_3 } from '../constants'
import {
  Match,
  NotificationSubscription,
  NotificationType,
  PrematchNotificationData,
  Team,
} from '../model'
import { removeInvalidTokens } from './removeInvalidTokens'

const db = admin.firestore()

/**
 * Envoyer la notification x heures avant le match.
 */
const HOURS_BEFORE_MATCH = 2

export const sendPrematchNotifications = functions
  .region(EU_WEST_3)
  .pubsub.schedule(`every ${HOURS_BEFORE_MATCH} hours`)
  .timeZone('Europe/Paris')
  .onRun(async (context) => {
    // On récupère la date de l'événement et on crée un intervalle avec date + 2 heures
    const startdate = new Date(context.timestamp)
    const endDate = new Date(context.timestamp)
    endDate.setHours(startdate.getHours() + HOURS_BEFORE_MATCH)

    // Récupération des matches à notifier (ceux dans l'intervalle de deux heures)
    const matchesToNotify = await db
      .collection('matches')
      .where('dateTime', '>=', startdate)
      .where('dateTime', '<', endDate)
      .get()

    if (matchesToNotify.size === 0) {
      console.log("Aucun match dans l'intervalle de notification")
      return
    }

    /**
     * Récupération des souscriptions qui ont activé les notifications de prématch
     */
    const usersToNotify = await admin
      .firestore()
      .collection('notificationSubscriptions')
      .where(NotificationType.PREMATCH, '==', true)
      .get()

    if (usersToNotify.size === 0) {
      console.log('Aucun utilisateur à notifier')
      return
    }

    await Promise.all(
      matchesToNotify.docs.map(async (matchSnap) => {
        console.log(
          '-- Envoi des notifications pour le match "%s" --',
          matchSnap.id,
        )
        const notificationData = await buildNotification(matchSnap)

        const subscriptionsWithoutBet = await findSubscriptionsWithoutBet(
          usersToNotify.docs,
          matchSnap.id,
        )

        if (subscriptionsWithoutBet.length === 0) {
          console.log(
            'Aucun utilisateur sans pari pour le match "%s". Aucune notification envoyée.',
            matchSnap.id,
          )
          return
        }

        const response = await admin.messaging().sendMulticast({
          data: notificationData,
          tokens: subscriptionsWithoutBet.map(({ token }) => token),
        })

        console.log(
          '%d notifications envoyées pour le match "%s".',
          response.successCount,
          matchSnap.id,
        )
        if (response.failureCount > 0) {
          console.log(
            '%d notifications en erreur pour le match "%s".',
            response.failureCount,
            matchSnap.id,
          )
          await removeInvalidTokens(response, subscriptionsWithoutBet)
        }
      }),
    )
  })

async function buildNotification(
  matchSnap: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>,
): Promise<PrematchNotificationData> {
  const match = matchSnap.data() as Match

  const [teamA, teamB] = await Promise.all(
    [match.teamA, match.teamB].map(fetchTeam),
  )

  const date = new Date(match.dateTime.toMillis())

  return {
    title: `${teamA.name} - ${teamB.name} commence bientôt`,
    notificationType: NotificationType.PREMATCH,
    matchDateTime: date.toISOString(),
    url: '/matches',
  }
}

/**
 * Récupération d'une équipe à partir de son id
 * @param teamId Identifiant de l'équipe
 * @returns Les données de l'équipe
 */
async function fetchTeam(teamId: string): Promise<Team> {
  const snapshot = await db.collection('teams').doc(teamId).get()
  return snapshot.data() as Team
}

/**
 * Vérifier pour chaque souscription que le pari n'a pas été déjà rempli.
 * On filtre ici les souscriptions qui correspondent à un utilisateur qui a déjà rempli son pari pour le match.
 *
 * @param subscriptionsSnapshot QuerySnapshot des souscriptions
 * @param matchId Identifiant du match
 * @returns Une liste de souscriptions qui correspondent à des utilisateurs qui n'ont pas rempli leur pari
 */
async function findSubscriptionsWithoutBet(
  subscriptionsSnapshot: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[],
  matchId: string,
): Promise<NotificationSubscription[]> {
  const subscriptions = subscriptionsSnapshot.map((snap) =>
    snap.data(),
  ) as NotificationSubscription[]

  const subscriptionsWithBets = await Promise.all(
    subscriptions.map(({ uid }) => betExists(uid, matchId)),
  )

  return subscriptions.filter((_, index) => !subscriptionsWithBets[index])
}

/**
 * Prédicat *asynchrone* pour vérifier si un pari existe.
 * Note: Ici on ne vérifie que l'existance du document, pas sa validité.
 *
 * @param uid Identifiant de l'utilisateur
 * @param matchId Identifiant du match
 * @returns `true` si le document existe, `false` sinon
 */
async function betExists(uid: string, matchId: string): Promise<Boolean> {
  const betSnapshot = await db.collection('bets').doc(`${matchId}_${uid}`).get()

  return betSnapshot.exists
}
