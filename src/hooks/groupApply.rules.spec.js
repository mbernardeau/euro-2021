import { assertFails, assertSucceeds } from '@firebase/rules-unit-testing'
import {
  createApp,
  ruleTestingCleanup,
  setupTestData,
  TEST_UID,
} from '../utils/testUtils'

const GROUP_ID = 'GROUP_ID'
const USER2_ID = 'USER2_ID'

describe('Firebase rules/groupApply', () => {
  let app
  let appUser2

  beforeAll(async () => {
    app = createApp()
    appUser2 = createApp({ uid: USER2_ID })
  })

  afterAll(ruleTestingCleanup)

  beforeAll(async () => {
    await setupTestData((adminApp) =>
      adminApp.firestore().collection('groups').doc(GROUP_ID).set({
        name: 'groupe test',
      }),
    )
  })

  it('should allow group apply creation if data is valid and group exists', async () => {
    await assertSucceeds(createGroupApply())
  })

  it('should refuse group apply creation if group does not exist', async () => {
    await assertFails(createGroupApply({ groupId: 'other-id' }))
  })

  it('should refuse group apply creation for other user', async () => {
    await assertFails(createGroupApply({ uid: 'uid' }))
  })

  it('should allow reading if own apply', async () => {
    await assertSucceeds(
      app
        .firestore()
        .collection('groupApply')
        .doc(`${GROUP_ID}_${TEST_UID}`)
        .get(),
    )
  })

  it('should refuse reading id apply is from a different user', async () => {
    await assertFails(
      appUser2
        .firestore()
        .collection('groupApply')
        .doc(`${GROUP_ID}_${TEST_UID}`)
        .get(),
    )
  })

  function createGroupApply({ groupId = GROUP_ID, uid = TEST_UID } = {}) {
    return app
      .firestore()
      .collection('groupApply')
      .doc(`${groupId}_${uid}`)
      .set({
        groupId,
        uid,
      })
  }
})
