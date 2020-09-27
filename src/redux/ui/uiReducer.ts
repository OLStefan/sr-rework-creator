import { Action } from '../rootReducer';
import { StorageActionTypes } from '../storage/storageActions';
import { UiActionTypes } from './uiActions';
import { UiState } from './uiTypes';

const initialState: UiState = {
	displayMenu: false,
	darkMode: true,
	useLocalStorage: null,
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

export default function (ui = initialState, action: Action): UiState {
	switch (action.type) {
		case UiActionTypes.SHOW_MENU:
			return handleShowMenu(ui);
		case StorageActionTypes.SET_CHARACTER:
		case StorageActionTypes.SAVE_CHARACTER:
		case UiActionTypes.HIDE_MENU:
			return handleHideMenu(ui);
		case UiActionTypes.CHANGE_DARK_MODE:
			return handleChangeDarkMode(ui);
		default:
			return ui;
	}
}
