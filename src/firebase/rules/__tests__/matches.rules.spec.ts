import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from '@firebase/firestore'
import {
  assertFails,
  assertSucceeds,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing'
import {
  createTestEnvironment,
  ruleTestingCleanup,
  TEST_UID,
} from './testUtils'

describe('Firebase rules/matches', () => {
  let env: RulesTestEnvironment

  beforeAll(async () => {
    env = await createTestEnvironment()
  })

  afterAll(() => ruleTestingCleanup(env))

  describe('with authenticated context', () => {
    let matchesCollection: CollectionReference<DocumentData>

    beforeAll(() => {
      matchesCollection = collection(
        env.authenticatedContext(TEST_UID).firestore(),
        'matches',
      )
    })

    it('should accept reading any team once authenticated', async () => {
      await assertSucceeds(getDoc(doc(matchesCollection, 'test-document')))
      await assertSucceeds(getDocs(matchesCollection))
    })

    it('should reject team writing', async () => {
      await assertFails(setDoc(doc(matchesCollection, 'test-document'), {}))
      await assertFails(deleteDoc(doc(matchesCollection, 'test-document')))
      await assertFails(updateDoc(doc(matchesCollection, 'test-document'), {}))
    })
  })

  describe('with unauthenticated context', () => {
    let matchesCollection: CollectionReference<DocumentData>

    beforeAll(() => {
      matchesCollection = collection(
        env.unauthenticatedContext().firestore(),
        'matches',
      )
    })

    it('should reject team writing', async () => {
      await assertFails(setDoc(doc(matchesCollection, 'test-document'), {}))
      await assertFails(deleteDoc(doc(matchesCollection, 'test-document')))
      await assertFails(updateDoc(doc(matchesCollection, 'test-document'), {}))
    })

    it('should reject team reading if not authenticated', async () => {
      await assertFails(getDoc(doc(matchesCollection, 'test-document')))
      await assertFails(getDocs(matchesCollection))
    })
  })
})
