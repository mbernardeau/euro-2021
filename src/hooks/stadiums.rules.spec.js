import { assertSucceeds, assertFails } from '@firebase/rules-unit-testing'
import {
  createApp,
  createUnauthenticatedApp,
  ruleTestingCleanup,
} from '../utils/testUtils'

describe('Firebase rules/stadiums', () => {
  let app
  let appUnauthenticated

  beforeAll(() => {
    app = createApp()
    appUnauthenticated = createUnauthenticatedApp()
  })

  afterAll(ruleTestingCleanup)

  it('should accept reading any team once authenticated', async () => {
    await assertSucceeds(
      app.firestore().collection('stadiums').doc('test-document').get(),
    )
    await assertSucceeds(app.firestore().collection('stadiums').get())
  })

  it('should reject team reading if not authenticated', async () => {
    await assertFails(
      appUnauthenticated
        .firestore()
        .collection('stadiums')
        .doc('test-document')
        .get(),
    )
    await assertFails(
      appUnauthenticated.firestore().collection('stadiums').get(),
    )
  })

  it('should reject team writing', async () => {
    await assertFails(
      app.firestore().collection('stadiums').doc('test-document').set({}),
    )
    await assertFails(
      app.firestore().collection('stadiums').doc('test-document').delete(),
    )
    await assertFails(
      app.firestore().collection('stadiums').doc('test-document').update({}),
    )
  })
})