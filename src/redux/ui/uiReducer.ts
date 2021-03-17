import { AnyAction } from '../rootReducer';
import storageActions from '../storage/storageActions';
import uiActions, { UiAction } from './uiActions';

const initialState: UiState = {
	displayMenu: false,
	isSelectingCharacter: false,
	darkMode: true,
	allowLocalStorage: null,
};

function handleShowMenu(ui: UiState): UiState {
	if (ui.displayMenu) {
		return ui;
	}
	return { ...ui, displayMenu: true };
}

function handleHideMenu(ui: UiState): UiState {
	if (!ui.displayMenu) {
		return ui;
	}
	return { ...ui, displayMenu: false };
}

function handleChangeDarkMode(ui: UiState): UiState {
	return { ...ui, darkMode: !ui.darkMode };
}

function handleSelectCharacter(ui: UiState): UiState {
	return { ...ui, isSelectingCharacter: true };
}

function handleSetCharacter(ui: UiState): UiState {
	return { ...ui, isSelectingCharacter: false, displayMenu: false };
}

function handleSetAllowStorage(ui: UiState, { value }: UiAction<'setAllowStorage'>): UiState {
	if (ui.allowLocalStorage === value) {
		return ui;
	}
	return { ...ui, allowLocalStorage: value };
}

export default function (ui = initialState, action: AnyAction): UiState {
	switch (action.type) {
		case uiActions.types.showMenu:
			return handleShowMenu(ui);
		case storageActions.types.setCharacter:
			return handleSetCharacter(ui);
		case storageActions.types.saveCharacter:
		case uiActions.types.hideMenu:
			return handleHideMenu(ui);
		case uiActions.types.changeDarkMode:
			return handleChangeDarkMode(ui);
		case uiActions.types.startSelectingCharacter:
			return handleSelectCharacter(ui);
		case uiActions.types.setAllowStorage:
			return handleSetAllowStorage(ui, action);
		default:
			return ui;
	}
}
