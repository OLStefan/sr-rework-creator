export const CREATE_NEW_CHARACTER = 'createNew';
export const LOAD_CHARACTER = 'load';

interface CreateNewCharacterAction {
	type: typeof CREATE_NEW_CHARACTER;
}
export function createNewCharacter(): CharacterAction {
	return { type: CREATE_NEW_CHARACTER };
}

interface LoadCharacterAction {
	type: typeof LOAD_CHARACTER;
}
export function loadCharacter(): CharacterAction {
	return { type: LOAD_CHARACTER };
}

export type CharacterAction = CreateNewCharacterAction | LoadCharacterAction;
