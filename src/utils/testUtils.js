import {
  initializeTestApp,
  apps,
  initializeAdminApp,
} from '@firebase/rules-unit-testing'

export const TEST_PROJECT_ID = 'euro2021'
export const TEST_UID = 'test uid'
export const ADMIN_UID = 'ADMIN_UID'

export const createApp = () =>
  initializeTestApp({
    projectId: TEST_PROJECT_ID,
    auth: { uid: TEST_UID },
  })

export const createAppAsAdminUser = () => {
  createAdminApp().firestore().collection('users').doc(ADMIN_UID).set(
    {
      uid: ADMIN_UID,
      admin: true,
    },
    { merge: true },
  )
  return initializeTestApp({
    projectId: TEST_PROJECT_ID,
    auth: { uid: ADMIN_UID },
  })
}

export const createUnauthenticatedApp = () =>
  initializeTestApp({
    projectId: TEST_PROJECT_ID,
  })

export const createAdminApp = () =>
  initializeAdminApp({
    projectId: TEST_PROJECT_ID,
  })

export const ruleTestingCleanup = () => {
  Promise.all(apps().map((app) => app.delete()))
}
