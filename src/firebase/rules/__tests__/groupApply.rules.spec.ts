import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  getDoc,
  setDoc,
} from '@firebase/firestore'
import {
  assertFails,
  assertSucceeds,
  RulesTestContext,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing'
import {
  createTestEnvironment,
  ruleTestingCleanup,
  TEST_UID,
} from './testUtils'

const GROUP_ID = 'GROUP_ID'
const OTHER_UID = 'OTHER_UID'

describe('Firebase rules/groupApply', () => {
  let env: RulesTestEnvironment

  beforeAll(async () => {
    env = await createTestEnvironment()

    await env.withSecurityRulesDisabled(async (context: RulesTestContext) => {
      const groupsCollection = collection(context.firestore(), 'groups')
      await setDoc(doc(groupsCollection, GROUP_ID), {
        name: 'groupe test',
      })
    })
  })

  afterAll(() => ruleTestingCleanup(env))

  describe('with authenticated context', () => {
    let groupApplyCollection: CollectionReference<DocumentData>

    beforeAll(() => {
      groupApplyCollection = collection(
        env.authenticatedContext(TEST_UID).firestore(),
        'groupApply',
      )
    })

    it('should allow group apply creation if data is valid and group exists', async () => {
      await assertSucceeds(createGroupApply(groupApplyCollection))
    })

    it('should refuse group apply creation if group does not exist', async () => {
      await assertFails(
        createGroupApply(groupApplyCollection, { groupId: 'other-id' }),
      )
    })

    it('should refuse group apply creation for other user', async () => {
      await assertFails(createGroupApply(groupApplyCollection, { uid: 'uid' }))
    })

    it('should allow reading if own apply', async () => {
      await assertSucceeds(
        getDoc(doc(groupApplyCollection, `${GROUP_ID}_${TEST_UID}`)),
      )
    })

    it('should refuse reading id apply is from a different user', async () => {
      await assertFails(
        getDoc(doc(groupApplyCollection, `${GROUP_ID}_${OTHER_UID}`)),
      )
    })
  })

  function createGroupApply(
    groupApplyCollection: CollectionReference<DocumentData>,
    { groupId = GROUP_ID, uid = TEST_UID } = {},
  ) {
    return setDoc(doc(groupApplyCollection, `${groupId}_${uid}`), {
      groupId,
      uid,
    })
  }
})
