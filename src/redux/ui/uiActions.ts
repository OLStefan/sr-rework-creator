export enum UiActionTypes {
	SHOW_MENU = 'showMenu',
	HIDE_MENU = 'hideMenu',
	CHANGE_DARK_MODE = 'changeDarkMode',
	SELCT_CHARACTER = 'selectCharacter',
	SET_ALLOW_STORAGE = 'setAllowStorage',
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

export function selectCharacter() {
	return { type: UiActionTypes.SELCT_CHARACTER } as const;
}

export function setAllowStorage(value: boolean) {
	return { type: UiActionTypes.SET_ALLOW_STORAGE, value } as const;
}

export type UiAction =
	| ReturnType<typeof showMenu>
	| ReturnType<typeof hideMenu>
	| ReturnType<typeof changeDarkMode>
	| ReturnType<typeof selectCharacter>
	| ReturnType<typeof setAllowStorage>;
