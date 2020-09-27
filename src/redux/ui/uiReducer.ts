import { Action } from '../rootReducer';
import { StorageActionTypes } from '../storage/storageActions';
import { UiActionTypes } from './uiActions';
import { UiState } from './uiTypes';

const initialState: UiState = {
	displayMenu: false,
	loadingCharacter: false,
	darkMode: true,
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
		default:
			return ui;
	}
}
