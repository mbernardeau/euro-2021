import {
  assertFails,
  assertSucceeds,
  firestore,
} from '@firebase/rules-unit-testing'
import {
  createApp,
  createAppAsAdminUser,
  ruleTestingCleanup,
  setupTestData,
  TEST_UID,
} from './testUtils'

const GROUP_ID = 'GROUP_ID'
const USER2_ID = 'USER2_ID'

describe('Firebase rules/groups', () => {
  let app
  let appUser2
  let appAdmin

  beforeAll(async () => {
    app = createApp()
    appUser2 = createApp({ uid: USER2_ID })
    appAdmin = await createAppAsAdminUser()
  })

  afterAll(ruleTestingCleanup)
  afterEach(async () => {
    await setupTestData((adminApp) =>
      adminApp.firestore().collection('groups').doc(GROUP_ID).delete(),
    )
  })

  it('should allow group creation if data is valid', async () => {
    await assertSucceeds(createGroup())
  })

  describe('group creation', () => {
    describe('Price validation', () => {
      it('should refuse group creation if price is negative', async () => {
        await assertFails(
          createGroup({
            price: -1,
          }),
        )
      })
      it('should refuse group creation if price is undefined', async () => {
        await assertFails(
          createGroup({
            price: null,
          }),
        )
      })

      it('should refuse group creation if price is not a number', async () => {
        await assertFails(
          createGroup({
            price: 'str',
          }),
        )
      })
    })

    describe('Percent validation', () => {
      it('should refuse group creation if percent is negative', async () => {
        await assertFails(
          createGroup({
            percent: -1,
          }),
        )
      })
      it('should refuse group creation if percent under 20', async () => {
        await assertFails(
          createGroup({
            percent: 16,
          }),
        )
      })
      it('should refuse group creation if percent above 80', async () => {
        await assertFails(
          createGroup({
            percent: 81,
          }),
        )
      })
      it('should refuse group creation if percent is undefined', async () => {
        await assertFails(
          createGroup({
            percent: null,
          }),
        )
      })

      it('should refuse group creation if percent is not a number', async () => {
        await assertFails(
          createGroup({
            percent: 'str',
          }),
        )
      })
    })

    describe('joinKey validation', () => {
      it('should refuse group creation if joinKey is less than 5 chars', async () => {
        await assertFails(
          createGroup({
            joinKey: 'A',
          }),
        )
      })
      it('should refuse group creation if joinKey more than 5 chars', async () => {
        await assertFails(
          createGroup({
            joinKey: 'ABCDEF',
          }),
        )
      })
      it('should refuse group creation if joinKey not a string', async () => {
        await assertFails(
          createGroup({
            joinKey: ['array', 'of', '5', 'elements', '.'],
          }),
        )
      })
    })

    describe('Name validation', () => {
      it('should fail if name is not a string', async () => {
        await assertFails(
          createGroup({
            name: ['array', 'of', 'more', 'than', '5', 'elements', '.'],
          }),
        )
      })
      it('should fail if name is less than 5 chars', async () => {
        await assertFails(
          createGroup({
            name: 'sho',
          }),
        )
      })
    })

    describe('createdBy validation', () => {
      it('should fail if createdBy is not filled', async () => {
        await assertFails(
          createGroup({
            createdBy: null,
          }),
        )
      })
      it('should fail if createdBy is not a string', async () => {
        await assertFails(
          createGroup({
            createdBy: ['array'],
          }),
        )
      })
      it('should fail if createdBy is the current user id', async () => {
        await assertFails(
          createGroup({
            createdBy: 'random string',
          }),
        )
      })
    })

    describe('createdAt validation', () => {
      it('should fail if createdAt is not a timestamp', async () => {
        await assertFails(
          createGroup({
            createdAt: '2018-05-10',
          }),
        )
      })
      it('should fail if createdAt is not the current request date', async () => {
        await assertFails(
          createGroup({
            createdAt: new Date('2018-05-10'),
          }),
        )
      })
    })
  })

  describe('group edition', () => {
    it('should be refused if user not admin', async () => {
      await createGroup()
      await assertFails(
        appUser2
          .firestore()
          .collection('groups')
          .doc(GROUP_ID)
          .update({
            createdAt: new Date('2018-05-10'),
          }),
      )
    })
    it('should be also be refused if user is admin', async () => {
      await createGroup()
      await assertFails(
        appAdmin
          .firestore()
          .collection('groups')
          .doc(GROUP_ID)
          .update({
            createdAt: new Date('2018-05-10'),
          }),
      )
    })
  })

  function createGroup({
    name = 'groupe test',
    price = 5,
    percent = 50,
    createdBy = TEST_UID,
    createdAt = firestore.FieldValue.serverTimestamp(),
    joinKey = 'ABCDE',
    version = 1,
  } = {}) {
    return app.firestore().collection('groups').doc(GROUP_ID).set({
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
