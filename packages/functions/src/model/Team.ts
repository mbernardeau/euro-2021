/**
 * Objet qui représente une équipe qui participe à la compétition
 */
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
