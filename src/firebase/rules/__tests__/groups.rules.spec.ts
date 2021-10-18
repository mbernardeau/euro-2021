import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  serverTimestamp,
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

const GROUP_ID = 'GROUP_ID'

describe('Firebase rules/groups', () => {
  let env: RulesTestEnvironment

  beforeAll(async () => {
    env = await createTestEnvironment()

    await env.withSecurityRulesDisabled(async (context: RulesTestContext) => {})
  })

  afterAll(() => ruleTestingCleanup(env))

  afterEach(async () => {
    await env.withSecurityRulesDisabled(async (context: RulesTestContext) => {
      const groupsCollection = collection(context.firestore(), 'groups')
      await deleteDoc(doc(groupsCollection, GROUP_ID))
    })
  })

  describe('with authenticated context', () => {
    let groupsCollection: CollectionReference<DocumentData>

    beforeAll(() => {
      groupsCollection = collection(
        env.authenticatedContext(TEST_UID).firestore(),
        'groups',
      )
    })

    it('should allow group creation if data is valid', async () => {
      await assertSucceeds(createGroup(groupsCollection))
    })

    describe('Price validation', () => {
      it('should refuse group creation if price is negative', async () => {
        await assertFails(
          createGroup(groupsCollection, {
            price: -1,
          }),
        )
      })

      it('should refuse group creation if price is undefined', async () => {
        await assertFails(
          createGroup(groupsCollection, {
            price: null,
          }),
        )
      })

      it('should refuse group creation if price is not a number', async () => {
        await assertFails(
          createGroup(groupsCollection, {
            price: 'str',
          }),
        )
      })

      describe('Percent validation', () => {
        it('should refuse group creation if percent is negative', async () => {
          await assertFails(
            createGroup(groupsCollection, {
              percent: -1,
            }),
          )
        })
        it('should refuse group creation if percent under 20', async () => {
          await assertFails(
            createGroup(groupsCollection, {
              percent: 16,
            }),
          )
        })
        it('should refuse group creation if percent above 80', async () => {
          await assertFails(
            createGroup(groupsCollection, {
              percent: 81,
            }),
          )
        })
        it('should refuse group creation if percent is undefined', async () => {
          await assertFails(
            createGroup(groupsCollection, {
              percent: null,
            }),
          )
        })

        it('should refuse group creation if percent is not a number', async () => {
          await assertFails(
            createGroup(groupsCollection, {
              percent: 'str',
            }),
          )
        })
      })

      describe('joinKey validation', () => {
        it('should refuse group creation if joinKey is less than 5 chars', async () => {
          await assertFails(
            createGroup(groupsCollection, {
              joinKey: 'A',
            }),
          )
        })
        it('should refuse group creation if joinKey more than 5 chars', async () => {
          await assertFails(
            createGroup(groupsCollection, {
              joinKey: 'ABCDEF',
            }),
          )
        })
        it('should refuse group creation if joinKey not a string', async () => {
          await assertFails(
            createGroup(groupsCollection, {
              joinKey: ['array', 'of', '5', 'elements', '.'],
            }),
          )
        })
      })

      describe('Name validation', () => {
        it('should fail if name is not a string', async () => {
          await assertFails(
            createGroup(groupsCollection, {
              name: ['array', 'of', 'more', 'than', '5', 'elements', '.'],
            }),
          )
        })
        it('should fail if name is less than 5 chars', async () => {
          await assertFails(
            createGroup(groupsCollection, {
              name: 'sho',
            }),
          )
        })
      })

      describe('createdBy validation', () => {
        it('should fail if createdBy is not filled', async () => {
          await assertFails(
            createGroup(groupsCollection, {
              createdBy: null,
            }),
          )
        })
        it('should fail if createdBy is not a string', async () => {
          await assertFails(
            createGroup(groupsCollection, {
              createdBy: ['array'],
            }),
          )
        })
        it('should fail if createdBy is the current user id', async () => {
          await assertFails(
            createGroup(groupsCollection, {
              createdBy: 'random string',
            }),
          )
        })

        describe('createdAt validation', () => {
          it('should fail if createdAt is not a timestamp', async () => {
            await assertFails(
              createGroup(groupsCollection, {
                createdAt: '2018-05-10',
              }),
            )
          })
          it('should fail if createdAt is not the current request date', async () => {
            await assertFails(
              createGroup(groupsCollection, {
                createdAt: new Date('2018-05-10'),
              }),
            )
          })
        })
      })

      it('group edition should be refused if user not admin', async () => {
        await createGroup(groupsCollection)
        await assertFails(
          updateDoc(doc(groupsCollection, GROUP_ID), {
            createdAt: new Date('2018-05-10'),
          }),
        )
      })
    })

    describe('with user admin context', () => {
      let groupsCollection: CollectionReference<DocumentData>

      beforeAll(() => {
        groupsCollection = collection(
          env.authenticatedContext(TEST_UID, { role: 'admin' }).firestore(),
          'groups',
        )
      })

      it('should be also be refused if user is admin', async () => {
        await createGroup(groupsCollection)
        await assertFails(
          updateDoc(doc(groupsCollection, GROUP_ID), {
            createdAt: new Date('2018-05-10'),
          }),
        )
      })
    })
  })

  function createGroup(
    groupsCollection: CollectionReference<DocumentData>,
    {
      name = 'groupe test',
      price = 5,
      percent = 50,
      createdBy = TEST_UID,
      createdAt = serverTimestamp(),
      joinKey = 'ABCDE',
      version = 1,
    }: any = {},
  ) {
    return setDoc(doc(groupsCollection, GROUP_ID), {
      name,
      price,
      percent,
      createdBy,
      createdAt,
      joinKey,
      version,
    })
  }
})
