/**
 * Objet qui représente un match
 */
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
