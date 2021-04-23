import { assertFails, assertSucceeds } from '@firebase/rules-unit-testing'
import {
  createApp,
  createAppAsAdminUser,
  createUnauthenticatedApp,
  ruleTestingCleanup,
  setupTestData,
  TEST_UID,
} from '../testUtils'

const OTHER_UID = 'OTHER_UID'

describe('Firebase rules/users', () => {
  let app
  let appUnauthenticated

  beforeAll(async () => {
    app = createApp()
    appUnauthenticated = createUnauthenticatedApp()

    await setupTestData(async (adminApp) => {
      await adminApp.firestore().collection('users').doc(TEST_UID).set({
        uid: TEST_UID,
      })
      await adminApp.firestore().collection('users').doc(OTHER_UID).set({
        uid: OTHER_UID,
      })
    })
  })

  afterAll(ruleTestingCleanup)

  it('should accept reading and writing own user data', async () => {
    await assertSucceeds(
      app.firestore().collection('users').doc(TEST_UID).get(),
    )
    await assertSucceeds(
      app
        .firestore()
        .collection('users')
        .doc(TEST_UID)
        .set({ avatarUrl: 'http://' }, { merge: true }),
    )
  })

  it('should refuse attempt to gain admin access', async () => {
    await assertFails(
      app.firestore().collection('users').doc(TEST_UID).update({ admin: true }),
    )
  })

  it('should reject reading and writing other user data', async () => {
    await assertFails(app.firestore().collection('users').doc(OTHER_UID).get())
    await assertFails(
      app
        .firestore()
        .collection('users')
        .doc(OTHER_UID)
        .set({ avatarUrl: 'http://' }, { merge: true }),
    )
  })

  it('should reject reading and writing user for unauthenticated user', async () => {
    await assertFails(
      appUnauthenticated.firestore().collection('users').doc(TEST_UID).get(),
    )
    await assertFails(
      appUnauthenticated
        .firestore()
        .collection('users')
        .doc(TEST_UID)
        .set({ avatarUrl: 'http://' }, { merge: true }),
    )
  })

  it('should accept reading and writing other user data if connected user is admin', async () => {
    const appAdmin = await createAppAsAdminUser()

    await assertSucceeds(
      appAdmin.firestore().collection('users').doc(TEST_UID).get(),
    )
    await assertSucceeds(
      appAdmin
        .firestore()
        .collection('users')
        .doc(TEST_UID)
        .set({ avatarUrl: 'http://' }, { merge: true }),
    )
  })
})
