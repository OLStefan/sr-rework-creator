import { SHOW_MENU, HIDE_MENU, CHANGE_DARK_MODE, TOGGLE_CARD } from './uiActionTypes';

export const showMenu = () => ({ type: SHOW_MENU });
export const hideMenu = () => ({ type: HIDE_MENU });

export const changeDarkMode = () => ({ type: CHANGE_DARK_MODE });

export const toggleCard = (card) => ({ type: TOGGLE_CARD, card });
