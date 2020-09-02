import { SHOW_MENU, HIDE_MENU } from './uiActionTypes';

const initialState = { displayMenu: false, darkMode: true };

function handleShowMenu(ui) {
	return { ...ui, displayMenu: true };
}

function handleHideMenu(ui) {
	return { ...ui, displayMenu: false };
}

export default function (ui = initialState, action) {
	switch (action.type) {
		case SHOW_MENU:
			return handleShowMenu(ui);
		case HIDE_MENU:
			return handleHideMenu(ui);
		default:
			return ui;
	}
}
