import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  setDoc,
  updateDoc,
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

const OTHER_UID = 'OTHER_UID'

describe('Firebase rules/opponents', () => {
  let env: RulesTestEnvironment

  beforeAll(async () => {
    env = await createTestEnvironment()

    await env.withSecurityRulesDisabled(async (context: RulesTestContext) => {
      const oppponentsCollection = collection(context.firestore(), 'opponents')
      await setDoc(doc(oppponentsCollection, TEST_UID), {
        uid: TEST_UID,
      })
      await setDoc(doc(oppponentsCollection, OTHER_UID), {
        uid: OTHER_UID,
      })
    })
  })

  afterAll(() => ruleTestingCleanup(env))

  describe('with authenticated context', () => {
    let opponentsCollection: CollectionReference<DocumentData>

    beforeAll(() => {
      opponentsCollection = collection(
        env.authenticatedContext(TEST_UID).firestore(),
        'opponents',
      )
    })

    it('should accept reading ourselves and any opponents', async () => {
      await assertSucceeds(getDoc(doc(opponentsCollection, TEST_UID)))
      await assertSucceeds(getDoc(doc(opponentsCollection, OTHER_UID)))
    })

    it('should reject writing on opponent data and other opponent data', async () => {
      await assertFails(
        updateDoc(doc(opponentsCollection, TEST_UID), { score: 1000 }),
      )
      await assertFails(deleteDoc(doc(opponentsCollection, TEST_UID)))
      await assertFails(
        updateDoc(doc(opponentsCollection, OTHER_UID), { score: 1000 }),
      )
      await assertFails(deleteDoc(doc(opponentsCollection, OTHER_UID)))
    })
  })

  describe('with unauthenticated context', () => {
    let opponentsCollection: CollectionReference<DocumentData>

    beforeAll(() => {
      opponentsCollection = collection(
        env.unauthenticatedContext().firestore(),
        'opponents',
      )
    })

    it('should reject reading data if unauthenticated', async () => {
      await assertFails(getDoc(doc(opponentsCollection, TEST_UID)))
      await assertFails(getDoc(doc(opponentsCollection, OTHER_UID)))
    })
  })
})
