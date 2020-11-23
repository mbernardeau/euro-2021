export const OPEN_MENU = 'OPEN_MENU'
export const CLOSE_MENU = 'CLOSE_MENU'
export const TOGGLE_MENU = 'TOGGLE_MENU'

export const openMenu = () => ({
  type: OPEN_MENU,
})

export const closeMenu = () => ({
  type: CLOSE_MENU,
})

export const toggleMenu = () => ({
  type: TOGGLE_MENU,
})

export const setMenuStatus = (open) => ({
  type: open ? OPEN_MENU : CLOSE_MENU,
})
