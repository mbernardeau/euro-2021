import { assertFails, assertSucceeds } from '@firebase/rules-unit-testing'
import {
  createApp,
  createUnauthenticatedApp,
  ruleTestingCleanup,
  setupTestData,
  TEST_UID,
} from './testUtils'

const OTHER_UID = 'OTHER_UID'

describe('Firebase rules/opponents', () => {
  let app
  let appUnauthenticated

  beforeAll(async () => {
    app = createApp()
    appUnauthenticated = createUnauthenticatedApp()

    await setupTestData(async (adminApp) => {
      await adminApp.firestore().collection('opponents').doc(TEST_UID).set({
        uid: TEST_UID,
      })
      await adminApp.firestore().collection('opponents').doc(OTHER_UID).set({
        uid: OTHER_UID,
      })
    })
  })

  afterAll(ruleTestingCleanup)

  it('should accept reading ourselves and any opponents', async () => {
    await assertSucceeds(
      app.firestore().collection('opponents').doc(TEST_UID).get(),
    )
    await assertSucceeds(
      app.firestore().collection('opponents').doc(OTHER_UID).get(),
    )
  })

  it('should reject reading data if unauthenticated', async () => {
    await assertFails(
      appUnauthenticated
        .firestore()
        .collection('opponents')
        .doc(TEST_UID)
        .get(),
    )
    await assertFails(
      appUnauthenticated
        .firestore()
        .collection('opponents')
        .doc(OTHER_UID)
        .get(),
    )
  })

  it('should reject writing on opponent data and other opponent data if unauthenticated', async () => {
    await assertFails(
      appUnauthenticated
        .firestore()
        .collection('opponents')
        .doc(TEST_UID)
        .update({ score: 1000 }),
    )
    await assertFails(
      appUnauthenticated
        .firestore()
        .collection('opponents')
        .doc(TEST_UID)
        .delete(),
    )
    await assertFails(
      appUnauthenticated
        .firestore()
        .collection('opponents')
        .doc(OTHER_UID)
        .update({ score: 1000 }),
    )
  })
})
