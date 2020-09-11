export const SHOW_MENU = 'showMenu';
export const HIDE_MENU = 'hideMenu';
export const CHANGE_DARK_MODE = 'changeDarkMode';
export const TOGGLE_CARD = 'toggleCard';

// Types
export interface UiState {
	displayMenu: boolean;
	darkMode: boolean;
	expandedCards: { [x: string]: boolean };
}

interface ShowMenuAction {
	type: typeof SHOW_MENU;
}
interface HideMenuAction {
	type: typeof HIDE_MENU;
}
interface ChangeDarkModeAction {
	type: typeof CHANGE_DARK_MODE;
}
interface ToggleCardAction {
	type: typeof TOGGLE_CARD;
	card: string;
}

export type UiAction = ShowMenuAction | HideMenuAction | ChangeDarkModeAction | ToggleCardAction;
