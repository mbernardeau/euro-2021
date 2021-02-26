/**
 * Donnée représentant une souscription aux notifications
 */
export interface NotificationSubscription {
  /** Identifiant de l'utilisateur */
  uid: string
  /** Jeton à passer à firebase messaging pour envoyer une notification */
  token: string
  /** Activation ou désactivation des notifications de prématch */
  [NotificationType.PREMATCH]: Boolean
}

/**
 * Identifiant lié à un type de notification.
 * Permet de faire des traitements particuliers dans le front (activation/désactivation),
 * dans les cloud functions ou dans le service worker.
 */
export enum NotificationType {
  /** Notification de prematch */
  PREMATCH = 'PREMATCH',
}

/**
 * Objet qui représente une notification  de prématch.
 * C'est l'objet qui sera transmis via firebase messaging au service worker
 */
export interface PrematchNotificationData extends NotificationData {
  /** Type de notification */
  notificationType: NotificationType.PREMATCH
  /** String ISO-8601 qui représente la date du coup d'envoi */
  matchDateTime: string
}

/**
 * Interface par défaut d'une notification qui est transmise au service worker via firebase messaging
 */
export interface NotificationData {
  [key: string]: string
  /**
   * Titre de la notification
   *
   * Voir: https://developer.mozilla.org/fr/docs/Web/API/Notification/title
   **/
  title: string
  /**
   * URL locale au domaine ('/' étant la page d'accueil).
   * Ce sera la page utilisée pour la redirection lorsqu'on clique sur la notification
   */
  url: `/${string}`
}
