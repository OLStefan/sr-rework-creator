export const CREATE_NEW_CHARACTER = 'createNew';
export const LOAD_CHARACTER = 'load';
export const CHANGE_ATTRIBUTE = 'changeAttribute';

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

interface ChangeAttribute {
	type: typeof CHANGE_ATTRIBUTE;
	attributeName: string;
	change: number;
}
export function changeAttribute(attributeName: string, change: number): CharacterAction {
	return { type: CHANGE_ATTRIBUTE, attributeName, change };
}

export type CharacterAction = CreateNewCharacterAction | LoadCharacterAction | ChangeAttribute;
