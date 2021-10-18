import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing'

export const TEST_PROJECT_ID = 'euro2021'
export const TEST_UID = 'test uid'
export const ADMIN_UID = 'ADMIN_UID'

export const createTestEnvironment = (): Promise<RulesTestEnvironment> =>
  initializeTestEnvironment({
    projectId: TEST_PROJECT_ID,
  })

export const ruleTestingCleanup = (env: RulesTestEnvironment) =>
  Promise.all([env.clearFirestore(), env.cleanup()])
