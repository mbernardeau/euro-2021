import { createSelector } from 'reselect'

const getNav = ({ nav }) => nav

export const getMenuOpen = createSelector(getNav, ({ open }) => open)
