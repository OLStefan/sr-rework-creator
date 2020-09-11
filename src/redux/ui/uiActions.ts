import { CHANGE_DARK_MODE, HIDE_MENU, SHOW_MENU, TOGGLE_CARD, UiAction } from './uiTypes';

export function showMenu(): UiAction {
	return { type: SHOW_MENU };
}
export function hideMenu(): UiAction {
	return { type: HIDE_MENU };
}

export function changeDarkMode(): UiAction {
	return { type: CHANGE_DARK_MODE };
}

export function toggleCard(card: string): UiAction {
	return { type: TOGGLE_CARD, card };
}
