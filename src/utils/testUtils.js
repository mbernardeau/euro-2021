import { initializeTestApp, apps } from '@firebase/rules-unit-testing'

export const TEST_PROJECT_ID = 'euro2021'
export const TEST_UID = 'test uid'

export const createApp = () =>
  initializeTestApp({
    projectId: TEST_PROJECT_ID,
    auth: { uid: TEST_UID },
  })

export const createUnauthenticatedApp = () =>
  initializeTestApp({
    projectId: TEST_PROJECT_ID,
  })

export const ruleTestingCleanup = () => {
  Promise.all(apps().map((app) => app.delete()))
}
