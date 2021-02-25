import { auth } from 'firebase-admin'
export interface ValidApplyParams {
  groupId: string
  userId: string
}

export interface UserProfile {
  uid: string
  avatarUrl?: string
  displayName: string
  profile?: {
    // Photo de profil (uniquement pour facebook)
    picture: {
      data: {
        height: number
        width: number
        url: string
      }
    }
  }
}

export interface Group {
  price: number
}

export interface GroupApply {
  groupId: string
  uid: string
}

export enum UserRole {
  admin = 'admin',
  user = 'user',
}

export interface Match {
  /** Date et heure du coup d'envoi */
  dateTime: FirebaseFirestore.Timestamp
  /** Identifiant du stade */
  stadium: string
  /** Identifiant de l'équipe A */
  teamA: string
  /** Identifiant de l'équipe B */
  teamB: string
  /** Chaîne de diffusion du match */
  streaming?: string
}

export interface Team {
  /** Code ISO du payse */
  code: string
  /** Group de l'équipe pour les phases de poule */
  group: string
  /** Nom d'affichage du pays */
  name: string
  /** Cote de victoire de l'équipe sur toute la compétition */
  winOdd: number
}

/**
 * Donnée représentant une souscription aux notifications
 */
export interface NotificationSubscription {
  /** Identifiant de l'utilisateur */
  uid: string
  /** Jeton à passer à firebase messaging pour envoyer une notification */
  token: string
}

/**
 * Identifiant lié à un type de notification.
 * Permet de faire des traitements partuliers dans le front (activation/désactivation),
 * dans les cloud functions ou dans le service worker
 */
export enum NotificationType {
  /** Notification de prematch */
  PREMATCH = 'PREMATCH',
}

export interface PrematchNotificationData extends NotificationData {
  notificationType: NotificationType.PREMATCH
  matchDateTime: string
}
export interface NotificationData {
  [key: string]: string
  title: string
  url: `/${string}`
}

export interface UserIdToken extends auth.DecodedIdToken {
  role?: UserRole
}
