export const SHOW_MENU = 'showMenu';
export const HIDE_MENU = 'hideMenu';
export const CHANGE_DARK_MODE = 'changeDarkMode';
export const TOGGLE_CARD = 'toggleCard';

interface ShowMenuAction {
	type: typeof SHOW_MENU;
}
export function showMenu(): UiAction {
	return { type: SHOW_MENU };
}

interface HideMenuAction {
	type: typeof HIDE_MENU;
}
export function hideMenu(): UiAction {
	return { type: HIDE_MENU };
}

interface ChangeDarkModeAction {
	type: typeof CHANGE_DARK_MODE;
}
export function changeDarkMode(): UiAction {
	return { type: CHANGE_DARK_MODE };
}

interface ToggleCardAction {
	type: typeof TOGGLE_CARD;
	cardName: string;
}
export function toggleCard(cardName: string): UiAction {
	return { type: TOGGLE_CARD, cardName };
}

export type UiAction = ShowMenuAction | HideMenuAction | ChangeDarkModeAction | ToggleCardAction;
