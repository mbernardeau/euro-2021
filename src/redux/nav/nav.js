import { toggle, set } from 'immutadot'

import { OPEN_MENU, CLOSE_MENU, TOGGLE_MENU } from './nav.actions'

const initState = {
  open: false,
}

const navReducer = (state = initState, action) => {
  const actions = {
    [OPEN_MENU]: () => set(state, 'open', true),
    [CLOSE_MENU]: () => set(state, 'open', false),
    [TOGGLE_MENU]: () => toggle(state, 'open'),
  }

  return actions[action.type] ? actions[action.type]() : state
}

export default navReducer
