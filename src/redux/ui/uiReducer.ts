import {
	ARMOR,
	ATTRIBUTES,
	CONTACTS,
	DETAILS,
	DRONES,
	GEAR,
	LIFESTYLES,
	QUALITIES,
	SKILLS,
	SPELLS,
	VEHICLES,
	WEAPONS,
} from '../../constants';
import { CharacterAction, CREATE_NEW_CHARACTER, LOAD_CHARACTER } from '../character/characterTypes';
import { CHANGE_DARK_MODE, HIDE_MENU, SHOW_MENU, TOGGLE_CARD, UiAction } from './uiActions';

export interface UiState {
	displayMenu: boolean;
	darkMode: boolean;
	expandedCards: { [cardname: string]: boolean };
}
const initialState: UiState = {
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

function handleToggleCard(ui: UiState, { cardName }: { cardName: string }) {
	if (!cardName) {
		return ui;
	}
	return { ...ui, expandedCards: { ...ui.expandedCards, [cardName]: !ui.expandedCards[cardName] } };
}

export default function (ui = initialState, action: UiAction | CharacterAction): UiState {
	switch (action.type) {
		case SHOW_MENU:
			return handleShowMenu(ui);
		case HIDE_MENU:
		case LOAD_CHARACTER:
		case CREATE_NEW_CHARACTER:
			return handleHideMenu(ui);
		case CHANGE_DARK_MODE:
			return handleChangeDarkMode(ui);
		case TOGGLE_CARD:
			return handleToggleCard(ui, action);
		default:
			return ui;
	}
}
