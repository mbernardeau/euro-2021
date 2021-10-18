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

describe('Firebase rules/stadiums', () => {
  let env: RulesTestEnvironment

  beforeAll(async () => {
    env = await createTestEnvironment()
  })

  afterAll(() => ruleTestingCleanup(env))

  describe('with authenticated context', () => {
    let stadiumsCollection: CollectionReference<DocumentData>

    beforeAll(() => {
      stadiumsCollection = collection(
        env.authenticatedContext(TEST_UID).firestore(),
        'stadiums',
      )
    })

    it('should accept reading any team once authenticated', async () => {
      await assertSucceeds(getDoc(doc(stadiumsCollection, 'test-document')))
      await assertSucceeds(getDocs(stadiumsCollection))
    })

    it('should reject team writing', async () => {
      await assertFails(setDoc(doc(stadiumsCollection, 'test-document'), {}))
      await assertFails(deleteDoc(doc(stadiumsCollection, 'test-document')))
      await assertFails(updateDoc(doc(stadiumsCollection, 'test-document'), {}))
    })
  })

  describe('with unauthenticated context', () => {
    let stadiumsCollection: CollectionReference<DocumentData>

    beforeAll(() => {
      stadiumsCollection = collection(
        env.unauthenticatedContext().firestore(),
        'stadiums',
      )
    })

    it('should reject team writing', async () => {
      await assertFails(setDoc(doc(stadiumsCollection, 'test-document'), {}))
      await assertFails(deleteDoc(doc(stadiumsCollection, 'test-document')))
      await assertFails(updateDoc(doc(stadiumsCollection, 'test-document'), {}))
    })

    it('should reject team reading if not authenticated', async () => {
      await assertFails(getDoc(doc(stadiumsCollection, 'test-document')))
      await assertFails(getDocs(stadiumsCollection))
    })
  })
})
