import { CharacterAction, CREATE_NEW_CHARACTER, LOAD_CHARACTER } from './characterTypes';

export function createNewCharacter(): CharacterAction {
	return { type: CREATE_NEW_CHARACTER };
}
export function loadCharacter(): CharacterAction {
	return { type: LOAD_CHARACTER };
}
