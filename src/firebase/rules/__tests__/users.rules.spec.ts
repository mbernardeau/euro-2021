import {
  collection,
  CollectionReference,
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

describe('Firebase rules/users', () => {
  let env: RulesTestEnvironment

  beforeAll(async () => {
    env = await createTestEnvironment()

    await env.withSecurityRulesDisabled(async (context: RulesTestContext) => {
      const usersCollection = collection(context.firestore(), 'users')
      await setDoc(doc(usersCollection, TEST_UID), {
        uid: TEST_UID,
      })
      await setDoc(doc(usersCollection, OTHER_UID), {
        uid: OTHER_UID,
      })
    })
  })

  afterAll(() => ruleTestingCleanup(env))

  describe('with authenticated context', () => {
    let usersCollection: CollectionReference<DocumentData>

    beforeAll(() => {
      usersCollection = collection(
        env.authenticatedContext(TEST_UID).firestore(),
        'users',
      )
    })

    it('should accept reading and writing own user data', async () => {
      await assertSucceeds(getDoc(doc(usersCollection, TEST_UID)))
      await assertSucceeds(
        setDoc(
          doc(usersCollection, TEST_UID),
          { avatarUrl: 'http://' },
          { merge: true },
        ),
      )
    })

    it('should refuse attempt to gain admin access', async () => {
      await assertFails(
        updateDoc(doc(usersCollection, TEST_UID), { admin: true }),
      )
    })

    it('should reject reading and writing other user data', async () => {
      await assertFails(getDoc(doc(usersCollection, OTHER_UID)))
      await assertFails(
        setDoc(
          doc(usersCollection, OTHER_UID),
          { avatarUrl: 'http://' },
          { merge: true },
        ),
      )
    })
  })

  describe('with user admin context', () => {
    let usersCollection: CollectionReference<DocumentData>

    beforeAll(() => {
      usersCollection = collection(
        env.authenticatedContext(TEST_UID, { role: 'admin' }).firestore(),
        'users',
      )
    })

    it('should accept reading and writing other user data if connected user is admin', async () => {
      await assertSucceeds(getDoc(doc(usersCollection, TEST_UID)))
      await assertSucceeds(
        setDoc(
          doc(usersCollection, TEST_UID),
          { avatarUrl: 'http://' },
          { merge: true },
        ),
      )
      await assertSucceeds(getDoc(doc(usersCollection, OTHER_UID)))
      await assertSucceeds(
        setDoc(
          doc(usersCollection, OTHER_UID),
          { avatarUrl: 'http://' },
          { merge: true },
        ),
      )
    })
  })

  describe('with unauthenticated context', () => {
    let usersCollection: CollectionReference<DocumentData>

    beforeAll(() => {
      usersCollection = collection(
        env.unauthenticatedContext().firestore(),
        'users',
      )
    })

    it('should reject reading and writing user', async () => {
      await assertFails(getDoc(doc(usersCollection, TEST_UID)))
      await assertFails(
        setDoc(
          doc(usersCollection, TEST_UID),
          { avatarUrl: 'http://' },
          { merge: true },
        ),
      )
    })
  })
})
