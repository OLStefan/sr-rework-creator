import { Action, UiState } from '../../types';
import { StorageActionTypes } from '../storage/storageActions';
import { setAllowStorage, UiActionTypes } from './uiActions';

const initialState: UiState = {
	displayMenu: false,
	isSelectingCharacter: false,
	darkMode: true,
	allowLocalStorage: null,
};

function handleShowMenu(ui: UiState) {
	if (ui.displayMenu) {
		return ui;
	}
	return { ...ui, displayMenu: true };
}

function handleHideMenu(ui: UiState) {
	if (!ui.displayMenu) {
		return ui;
	}
	return { ...ui, displayMenu: false };
}

function handleChangeDarkMode(ui: UiState) {
	return { ...ui, darkMode: !ui.darkMode };
}

function handleSelectCharacter(ui: UiState) {
	return { ...ui, loadingCharacter: true };
}

function handleSetCharacter(ui: UiState) {
	return { ...ui, loadingCharacter: false, displayMenu: false };
}

function handleSetAllowStorage(ui: UiState, { value }: ReturnType<typeof setAllowStorage>) {
	if (ui.allowLocalStorage === value) {
		return ui;
	}
	return { ...ui, allowLocalStorage: value };
}

export default function (ui = initialState, action: Action): UiState {
	switch (action.type) {
		case UiActionTypes.SHOW_MENU:
			return handleShowMenu(ui);
		case StorageActionTypes.SET_CHARACTER:
			return handleSetCharacter(ui);
		case StorageActionTypes.SAVE_CHARACTER:
		case UiActionTypes.HIDE_MENU:
			return handleHideMenu(ui);
		case UiActionTypes.CHANGE_DARK_MODE:
			return handleChangeDarkMode(ui);
		case UiActionTypes.SELCT_CHARACTER:
			return handleSelectCharacter(ui);
		case UiActionTypes.SET_ALLOW_STORAGE:
			return handleSetAllowStorage(ui, action);
		default:
			return ui;
	}
}
