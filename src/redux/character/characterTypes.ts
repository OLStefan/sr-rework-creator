export const CREATE_NEW_CHARACTER = 'createNew';
export const LOAD_CHARACTER = 'load';

// Types
export type CharacterState = any;

interface CreateNewCharacterAction {
	type: typeof CREATE_NEW_CHARACTER;
}
interface LoadCharacterAction {
	type: typeof LOAD_CHARACTER;
}
export type CharacterAction = CreateNewCharacterAction | LoadCharacterAction;
