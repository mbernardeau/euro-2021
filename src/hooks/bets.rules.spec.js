import {
  assertFails,
  assertSucceeds,
  firestore,
} from '@firebase/rules-unit-testing'
import { firestore as firestoreAdmin } from 'firebase-admin'
import {
  createApp,
  ruleTestingCleanup,
  setupTestData,
  TEST_UID,
} from '../utils/testUtils'

const MATCH_ID = 'MATCH_ID'
const OTHER_UID = 'OTHER_UID'

describe('Firebase rules/bets', () => {
  let app

  beforeAll(async () => {
    app = createApp()

    await setupTestData(async (adminApp) => {
      // Create a match with id MATCH_ID to verify it exists when creating bet
      await adminApp
        .firestore()
        .collection('matches')
        .doc(MATCH_ID)
        .set(
          {
            dateTime: new Date('2020-12-15T08:25:34.890Z'),
            teamA: 'TEAM_A',
            teamB: 'TEAM_B',
          },
          {
            merge: true,
          },
        )

      // Create a bet with MATCH_ID and OTHER_UID to verify we can't read nor write other users' bets
      await adminApp
        .firestore()
        .collection('bets')
        .doc(`${MATCH_ID}_${OTHER_UID}`)
        .set({
          matchId: MATCH_ID,
          uid: OTHER_UID,
          betTeamA: 1,
          betTeamB: 0,
          updatedAt: firestoreAdmin.FieldValue.serverTimestamp(),
          version: firestoreAdmin.FieldValue.increment(1),
        })
    })
  })

  afterAll(ruleTestingCleanup)

  it('should accept creating and reading bet for own user', async () => {
    await assertSucceeds(saveBet({}))
    await assertSucceeds(readBet({}))
  })

  it('should refuse writing bet for other user', async () => {
    await assertFails(saveBet({ uid: 'other-uid' }))
  })

  it('should refuse writing bet if match does not exist', async () => {
    await assertFails(saveBet({ matchId: 'other-match-id' }))
  })

  it('should refuse writing bet if bets are not valid', async () => {
    await assertFails(saveBet({ betTeamA: null }))
    await assertFails(saveBet({ betTeamA: 'str' }))
    await assertFails(saveBet({ betTeamA: -1 }))

    await assertFails(saveBet({ betTeamB: null }))
    await assertFails(saveBet({ betTeamB: 'str' }))
    await assertFails(saveBet({ betTeamB: -1 }))
  })

  function readBet({ matchId = MATCH_ID, uid = TEST_UID }) {
    return app.firestore().collection('bets').doc(`${matchId}_${uid}`).get()
  }

  function saveBet({
    matchId = MATCH_ID,
    uid = TEST_UID,
    betTeamA = 1,
    betTeamB = 0,
    updatedAt = firestore.FieldValue.serverTimestamp(),
    version = firestore.FieldValue.increment(1),
    ...data
  }) {
    return app
      .firestore()
      .collection('bets')
      .doc(`${matchId}_${uid}`)
      .set(
        {
          matchId,
          uid,
          betTeamA,
          betTeamB,
          updatedAt,
          version,
          ...data,
        },
        {
          merge: true,
        },
      )
  }
})
