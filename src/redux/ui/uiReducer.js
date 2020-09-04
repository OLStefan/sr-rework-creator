import { SHOW_MENU, HIDE_MENU, CHANGE_DARK_MODE, TOGGLE_CARD } from './uiActionTypes';
import { CREATE_NEW_CHARACTER, LOAD_CHARACTER } from '../character/characterActionTypes';
import {
	QUALITIES,
	ATTRIBUTES,
	SKILLS,
	SPELLS,
	WEAPONS,
	ARMOR,
	GEAR,
	VEHICLES,
	DRONES,
	LIFESTYLES,
	DETAILS,
	CONTACTS,
} from '../../constants';

const initialState = {
	displayMenu: false,
	darkMode: true,
	expandedCards: {
		[DETAILS]: true,
		[QUALITIES]: false,
		[ATTRIBUTES]: false,
		[SKILLS]: false,
		[SPELLS]: false,
		[WEAPONS]: false,
		[ARMOR]: false,
		[GEAR]: false,
		[VEHICLES]: false,
		[DRONES]: false,
		[LIFESTYLES]: false,
		[CONTACTS]: false,
	},
};

function handleShowMenu(ui) {
	if (ui.displayMenu) {
		return ui;
	}
	return { ...ui, displayMenu: true };
}

function handleHideMenu(ui) {
	if (!ui.displayMenu) {
		return ui;
	}
	return { ...ui, displayMenu: false };
}

function handleChangeDarkMode(ui) {
	return { ...ui, darkMode: !ui.darkMode };
}

function handleToggleCard(ui, action) {
	const { card } = action;
	return { ...ui, expandedCards: { ...ui.expandedCards, [card]: !ui.expandedCards[card] } };
}

export default function (ui = initialState, action) {
	switch (action.type) {
		case SHOW_MENU:
			return handleShowMenu(ui);
		case CREATE_NEW_CHARACTER:
		case LOAD_CHARACTER:
		case HIDE_MENU:
			return handleHideMenu(ui);
		case CHANGE_DARK_MODE:
			return handleChangeDarkMode(ui);
		case TOGGLE_CARD:
			return handleToggleCard(ui, action);
		default:
			return ui;
	}
}
