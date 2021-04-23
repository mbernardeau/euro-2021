/**
 * Modèle d'un groupe d'utilisateurs
 */
export interface Group {
  /** Prix du groupe (0 si gratuit) */
  price: number
}

/**
 * Objet qui représente une candidature à un groupe
 */
export interface GroupApply {
  /** Identifiant du group */
  groupId: string
  /** Identifiant de l'utilisateur */
  uid: string
}

export interface ValidApplyParams {
  groupId: string
  userId: string
}
