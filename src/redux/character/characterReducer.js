import { LOAD_CHARACTER, CREATE_NEW_CHARACTER } from './characterActionTypes';
import createNewCharacter from './createNewCharacter';

const initialState = createNewCharacter();

function handleCreateNewCharacter() {
	return createNewCharacter();
}

function handleLoadCharacter() {
	return createNewCharacter();
}

export default function (character = initialState, action) {
	switch (action.type) {
		case CREATE_NEW_CHARACTER:
			return handleCreateNewCharacter();
		case LOAD_CHARACTER:
			return handleLoadCharacter();
		default:
			return character;
	}
}
