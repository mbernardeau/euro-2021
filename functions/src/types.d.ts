export interface ValidApplyParams {
  groupId: string
  userId: string
}

export interface UserProfile {
  uid: string
  avatarUrl?: string
  displayName: string
  admin?: boolean
}

export interface Group {
  price: number
}

export interface GroupApply {
  groupId: string
  uid: string
}
