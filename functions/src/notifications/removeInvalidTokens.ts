import { firestore, messaging } from 'firebase-admin'
import { NotificationSubscription } from '../model'

const invalidTokenErrorCodes = [
  'messaging/registration-token-not-registered',
  'messaging/invalid-argument',
]

const db = firestore()

/**
 * Suppression des tokens ayant provoqué une erreur "normale" car ils ont expiré
 *
 * @param response Réponse d'un envoi de message en multicast
 * @param notificationSubscriptions Snapshot des `notificationSubscriptions`
 */
export async function removeInvalidTokens(
  response: messaging.BatchResponse,
  notificationSubscriptions: NotificationSubscription[],
): Promise<void> {
  if (
    response.failureCount + response.successCount !==
    notificationSubscriptions.length
  ) {
    throw new Error(
      "La fonction removeInvalidTokens doit être appelée avec les notificationSubscriptions utilisées pour l'appel à sendMulticast",
    )
  }

  const invalidSubscriptions = response.responses
    .map(({ error }, index) => {
      if (error) {
        if (invalidTokenErrorCodes.includes(error.code)) {
          return index
        }

        console.error(
          "Erreur inconnue lors de l'envoi d'une notification. (code= '%s', message= '%s', token= '%s', uid= '%s')",
          error.code,
          error.message,
          notificationSubscriptions[index].token,
          notificationSubscriptions[index].uid,
        )
      }

      return null
    })
    .filter((index) => index !== null)
    .map((index) => notificationSubscriptions[index || -1])
    .map(({ token }) => db.collection('notificationSubscriptions').doc(token))

  if (invalidSubscriptions.length) {
    const batch = db.batch()

    invalidSubscriptions.forEach((ref) => batch.delete(ref))

    await batch.commit()

    console.log(
      '%d souscriptions expirées ont été supprimées',
      invalidSubscriptions.length,
    )
  }
}
