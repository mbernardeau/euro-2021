import { auth } from 'firebase-admin'

export interface ValidApplyParams {
  groupId: string
  userId: string
}

export interface UserProfile {
  uid: string
  avatarUrl?: string
  displayName: string
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

export interface UserIdToken extends auth.DecodedIdToken {
  role?: UserRole
}
