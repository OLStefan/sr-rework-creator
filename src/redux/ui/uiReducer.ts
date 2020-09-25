import { CharacterActionTypes, saveCharacter } from '../character/characterActions';
import { toggleCard, UiActionTypes } from './uiActions';
import { Action } from '../rootReducer';
import { SectionName } from '../../constants';
import { UiState } from './types';

const initialState: UiState = {
	currentIncrement: 0,
	savedIncrement: 0,
	displayMenu: false,
	darkMode: true,
	expandedCards: (function () {
		const cards: any = {};
		Object.values(SectionName).forEach((name) => (cards[name] = name === SectionName.details));
		return cards;
	})(),
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

function handleToggleCard(ui: UiState, { cardName }: ReturnType<typeof toggleCard>) {
	if (!cardName) {
		return ui;
	}
	return { ...ui, expandedCards: { ...ui.expandedCards, [cardName]: !ui.expandedCards[cardName] } };
}

function handleNewCharacterDisplayed(ui: UiState) {
	const savedIncrement = 0;
	const currentIncrement = 0;

	return { ...ui, displayMenu: false, savedIncrement, currentIncrement, expandedCards: initialState.expandedCards };
}

function handleSavedCharacter(ui: UiState, { increment }: ReturnType<typeof saveCharacter>) {
	if (increment === ui.savedIncrement) {
		return ui;
	}

	return { ...ui, savedIncrement: increment };
}

export default function (ui = initialState, action: Action): UiState {
	switch (action.type) {
		case CharacterActionTypes.LOAD_CHARACTER:
		case CharacterActionTypes.CREATE_NEW_CHARACTER:
			return handleNewCharacterDisplayed(ui);
		case CharacterActionTypes.SAVE_CHARACTER:
			return handleSavedCharacter(ui, action);
		case UiActionTypes.SHOW_MENU:
			return handleShowMenu(ui);
		case UiActionTypes.HIDE_MENU:
			return handleHideMenu(ui);
		case UiActionTypes.CHANGE_DARK_MODE:
			return handleChangeDarkMode(ui);
		case UiActionTypes.TOGGLE_CARD:
			return handleToggleCard(ui, action);
		default:
			return ui;
	}
}
