import { LOAD_CHARACTER, CREATE_NEW_CHARACTER, CharacterState, CharacterAction } from './characterTypes';
import createNewCharacter from './createNewCharacter';

const initialState: CharacterState = null;

function handleCreateNewCharacter() {
	return createNewCharacter();
}

function handleLoadCharacter() {
	return createNewCharacter();
}

export default function (character = initialState, action: CharacterAction): CharacterState {
	switch (action.type) {
		case CREATE_NEW_CHARACTER:
			return handleCreateNewCharacter();
		case LOAD_CHARACTER:
			return handleLoadCharacter();
		default:
			return character;
	}
}
