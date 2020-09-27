import { Action } from '../../rootReducer';
import { StorageActionTypes } from '../../storage/storageActions';
import { UiActionTypes } from '../../ui/uiActions';
import { Character } from './characterTypes';

const initialState: Character | null = null;

export default function (character = initialState, action: Action) {
	if (!character) {
		return character;
	}
	switch (action.type) {
		case UiActionTypes.CHANGE_DARK_MODE:
		case UiActionTypes.SHOW_MENU:
		case UiActionTypes.HIDE_MENU:
		case StorageActionTypes.SAVE_CHARACTER:
		case StorageActionTypes.SET_CHARACTER:
			return character;
		default:
			return { ...character, increment: character.increment + 1 };
	}
}
