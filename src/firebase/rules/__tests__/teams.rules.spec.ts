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

describe('Firebase rules/teams', () => {
  let env: RulesTestEnvironment

  beforeAll(async () => {
    env = await createTestEnvironment()
  })

  afterAll(() => ruleTestingCleanup(env))

  describe('with authenticated context', () => {
    let teamsCollection: CollectionReference<DocumentData>

    beforeAll(() => {
      teamsCollection = collection(
        env.authenticatedContext(TEST_UID).firestore(),
        'teams',
      )
    })

    it('should accept reading any team once authenticated', async () => {
      await assertSucceeds(getDoc(doc(teamsCollection, 'test-document')))
      await assertSucceeds(getDocs(teamsCollection))
    })

    it('should reject team writing', async () => {
      await assertFails(setDoc(doc(teamsCollection, 'test-document'), {}))
      await assertFails(deleteDoc(doc(teamsCollection, 'test-document')))
      await assertFails(updateDoc(doc(teamsCollection, 'test-document'), {}))
    })
  })

  describe('with unauthenticated context', () => {
    let teamsCollection: CollectionReference<DocumentData>

    beforeAll(() => {
      teamsCollection = collection(
        env.unauthenticatedContext().firestore(),
        'teams',
      )
    })

    it('should reject team writing', async () => {
      await assertFails(setDoc(doc(teamsCollection, 'test-document'), {}))
      await assertFails(deleteDoc(doc(teamsCollection, 'test-document')))
      await assertFails(updateDoc(doc(teamsCollection, 'test-document'), {}))
    })

    it('should reject team reading if not authenticated', async () => {
      await assertFails(getDoc(doc(teamsCollection, 'test-document')))
      await assertFails(getDocs(teamsCollection))
    })
  })
})
