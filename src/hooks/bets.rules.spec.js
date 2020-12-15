import {
  assertFails,
  assertSucceeds,
  firestore,
} from '@firebase/rules-unit-testing'
import { addMinutes, subMinutes } from 'date-fns'
import { firestore as firestoreAdmin } from 'firebase-admin'
import {
  createApp,
  ruleTestingCleanup,
  setupTestData,
  TEST_UID,
} from '../utils/testUtils'

const FUTURE_MATCH_ID = 'FUTURE_MATCH_ID'
const PAST_MATCH_ID = 'PAST_MATCH_ID'
const OTHER_UID = 'OTHER_UID'

describe('Firebase rules/bets', () => {
  let app

  beforeAll(async () => {
    app = createApp()

    await setupTestData(async (adminApp) => {
      // Create a match with id FUTURE_MATCH_ID to verify it exists when creating bet
      await adminApp
        .firestore()
        .collection('matches')
        .doc(FUTURE_MATCH_ID)
        .set(
          {
            dateTime: addMinutes(new Date(), 10),
            teamA: 'TEAM_A',
            teamB: 'TEAM_B',
          },
          {
            merge: true,
          },
        )

      // Create a match in the past with id PAST_MATCH_ID to verify it exists when creating bet
      await adminApp
        .firestore()
        .collection('matches')
        .doc(PAST_MATCH_ID)
        .set(
          {
            dateTime: subMinutes(new Date(), 10),
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
        .doc(`${FUTURE_MATCH_ID}_${OTHER_UID}`)
        .set({
          matchId: FUTURE_MATCH_ID,
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

  it('should refuse bets placed on matches that have begun', async () => {
    await assertFails(saveBet({ matchId: PAST_MATCH_ID }))
  })

  function readBet({ matchId = FUTURE_MATCH_ID, uid = TEST_UID }) {
    return app.firestore().collection('bets').doc(`${matchId}_${uid}`).get()
  }

  function saveBet({
    matchId = FUTURE_MATCH_ID,
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
