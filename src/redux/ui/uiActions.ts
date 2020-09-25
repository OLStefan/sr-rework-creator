import { SectionName } from '../../constants';

export enum UiActionTypes {
	SHOW_MENU = 'showMenu',
	HIDE_MENU = 'hideMenu',
	CHANGE_DARK_MODE = 'changeDarkMode',
	TOGGLE_CARD = 'toggleCard',
}

export function showMenu() {
	return { type: UiActionTypes.SHOW_MENU } as const;
}

export function hideMenu() {
	return { type: UiActionTypes.HIDE_MENU } as const;
}

export function changeDarkMode() {
	return { type: UiActionTypes.CHANGE_DARK_MODE } as const;
}

export function toggleCard(cardName: keyof typeof SectionName) {
	return { type: UiActionTypes.TOGGLE_CARD, cardName } as const;
}

export type UiAction =
	| ReturnType<typeof showMenu>
	| ReturnType<typeof hideMenu>
	| ReturnType<typeof changeDarkMode>
	| ReturnType<typeof toggleCard>;
