import {
  apps,
  clearFirestoreData,
  initializeAdminApp,
  initializeTestApp,
} from '@firebase/rules-unit-testing'

export const TEST_PROJECT_ID = 'euro2021'
export const TEST_UID = 'test uid'
export const ADMIN_UID = 'ADMIN_UID'

export const createApp = ({ uid = TEST_UID } = {}) =>
  initializeTestApp({
    projectId: TEST_PROJECT_ID,
    auth: { uid },
  })

export const createAppAsAdminUser = () => {
  return initializeTestApp({
    projectId: TEST_PROJECT_ID,
    auth: { uid: ADMIN_UID, role: 'admin' },
  })
}

export const setupTestData = async (setupFn) => {
  const adminApp = createAdminApp()

  await setupFn(adminApp)

  await adminApp.delete()
}

export const createUnauthenticatedApp = () =>
  initializeTestApp({
    projectId: TEST_PROJECT_ID,
  })

export const createAdminApp = () =>
  initializeAdminApp({
    projectId: TEST_PROJECT_ID,
  })

export const ruleTestingCleanup = async () => {
  await clearFirestoreData({
    projectId: TEST_PROJECT_ID,
  })
  await Promise.all(apps().map((app) => app.delete()))
}
