import { assertSucceeds, assertFails } from '@firebase/rules-unit-testing'
import {
  createAdminApp,
  createApp,
  createAppAsAdminUser,
  createUnauthenticatedApp,
  ruleTestingCleanup,
  TEST_UID,
} from '../utils/testUtils'

const OTHER_UID = 'OTHER_UID'

describe('Firebase rules/matches', () => {
  let app
  let appUnauthenticated

  beforeAll(() => {
    app = createApp()
    appUnauthenticated = createUnauthenticatedApp()

    createAdminApp().firestore().collection('users').doc(TEST_UID).set({
      uid: TEST_UID,
    })
    createAdminApp().firestore().collection('users').doc(OTHER_UID).set({
      uid: OTHER_UID,
    })
  })

  afterAll(ruleTestingCleanup)

  it('should accept reading and writing own user data', async () => {
    assertSucceeds(app.firestore().collection('users').doc(TEST_UID).get())
    assertSucceeds(
      app
        .firestore()
        .collection('users')
        .doc(TEST_UID)
        .set({ avatarUrl: 'http://' }, { merge: true }),
    )
  })

  it('should reject reading and writing other user data', async () => {
    assertFails(app.firestore().collection('users').doc(OTHER_UID).get())
    assertFails(
      app
        .firestore()
        .collection('users')
        .doc(OTHER_UID)
        .set({ avatarUrl: 'http://' }, { merge: true }),
    )
  })

  it('should reject reading and writing user for unauthenticated user', async () => {
    assertFails(
      appUnauthenticated.firestore().collection('users').doc(TEST_UID).get(),
    )
    assertFails(
      appUnauthenticated
        .firestore()
        .collection('users')
        .doc(TEST_UID)
        .set({ avatarUrl: 'http://' }, { merge: true }),
    )
  })

  it('should accept reading and writing other user data if connected user is admin', () => {
    const appAdmin = createAppAsAdminUser()

    assertSucceeds(appAdmin.firestore().collection('users').doc(TEST_UID).get())
    assertSucceeds(
      appAdmin
        .firestore()
        .collection('users')
        .doc(TEST_UID)
        .set({ avatarUrl: 'http://' }, { merge: true }),
    )
  })
})
