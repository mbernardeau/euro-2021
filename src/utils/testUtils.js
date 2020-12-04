import { initializeTestApp, apps } from '@firebase/rules-unit-testing'

export const TEST_UID = 'test uid'

export const createApp = () =>
  initializeTestApp({
    projectId: 'euro2021-3d006',
    auth: { uid: TEST_UID },
  })

export const createUnauthenticatedApp = () =>
  initializeTestApp({
    projectId: 'euro2021-3d006',
  })

export const ruleTestingCleanup = () => {
  Promise.all(apps().map((app) => app.delete()))
}
