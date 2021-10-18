import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  getDoc,
  increment,
  serverTimestamp,
  setDoc,
} from '@firebase/firestore'
import {
  assertFails,
  assertSucceeds,
  RulesTestContext,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing'
import { addMinutes, subMinutes } from 'date-fns'
import {
  createTestEnvironment,
  ruleTestingCleanup,
  TEST_UID,
} from './testUtils'

const FUTURE_MATCH_ID = 'FUTURE_MATCH_ID'
const PAST_MATCH_ID = 'PAST_MATCH_ID'
const OTHER_UID = 'OTHER_UID'

describe('Firebase rules/bets', () => {
  let env: RulesTestEnvironment

  beforeAll(async () => {
    env = await createTestEnvironment()

    await env.withSecurityRulesDisabled(async (context: RulesTestContext) => {
      const matches = collection(context.firestore(), 'matches')
      const betsCollection = collection(context.firestore(), 'bets')

      // Create a match with id FUTURE_MATCH_ID to verify it exists when creating bet
      await setDoc(doc(matches, FUTURE_MATCH_ID), {
        dateTime: addMinutes(new Date(), 10),
        teamA: 'TEAM_A',
        teamB: 'TEAM_B',
      })

      // Create a match in the past with id PAST_MATCH_ID to verify it exists when creating bet
      await setDoc(doc(matches, PAST_MATCH_ID), {
        dateTime: subMinutes(new Date(), 10),
        teamA: 'TEAM_A',
        teamB: 'TEAM_B',
      })

      // Create a bet with MATCH_ID and OTHER_UID to verify we can't read nor write other users' bets
      await setDoc(doc(betsCollection, `${FUTURE_MATCH_ID}_${OTHER_UID}`), {
        matchId: FUTURE_MATCH_ID,
        uid: OTHER_UID,
        betTeamA: 1,
        betTeamB: 0,
        updatedAt: serverTimestamp(),
        version: increment(1),
      })
    })
  })

  afterAll(() => ruleTestingCleanup(env))

  describe('with authenticated context', () => {
    let betsCollection: CollectionReference<DocumentData>

    beforeAll(() => {
      betsCollection = collection(
        env.authenticatedContext(TEST_UID).firestore(),
        'bets',
      )
    })

    it('should accept creating and reading bet for own user', async () => {
      await assertSucceeds(saveBet(betsCollection, {}))
      await assertSucceeds(readBet(betsCollection, {}))
    })

    it('should refuse writing bet for other user', async () => {
      await assertFails(saveBet(betsCollection, { uid: 'other-uid' }))
    })

    it('should refuse writing bet if match does not exist', async () => {
      await assertFails(saveBet(betsCollection, { matchId: 'other-match-id' }))
    })

    it('should refuse writing bet if bets are not valid', async () => {
      await assertFails(saveBet(betsCollection, { betTeamA: null }))
      await assertFails(saveBet(betsCollection, { betTeamA: 'str' }))
      await assertFails(saveBet(betsCollection, { betTeamA: -1 }))

      await assertFails(saveBet(betsCollection, { betTeamB: null }))
      await assertFails(saveBet(betsCollection, { betTeamB: 'str' }))
      await assertFails(saveBet(betsCollection, { betTeamB: -1 }))
    })

    it('should refuse bets placed on matches that have begun', async () => {
      await assertFails(saveBet(betsCollection, { matchId: PAST_MATCH_ID }))
    })
  })

  function readBet(
    betsCollection: CollectionReference<DocumentData>,
    { matchId = FUTURE_MATCH_ID, uid = TEST_UID },
  ) {
    return getDoc(doc(betsCollection, `${matchId}_${uid}`))
  }

  function saveBet(
    betsCollection: CollectionReference<DocumentData>,
    {
      matchId = FUTURE_MATCH_ID,
      uid = TEST_UID,
      betTeamA = 1,
      betTeamB = 0,
      updatedAt = serverTimestamp(),
      version = increment(1),
      ...data
    }: any,
  ) {
    return setDoc(
      doc(betsCollection, `${matchId}_${uid}`),
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
