export const CREATE_NEW_CHARACTER = 'createNew';
export const LOAD_CHARACTER = 'load';

// Types
export type CharacterState = null | {
	name: string;
	careerMode: boolean;
	attributes: { [attributeName: string]: Attribute };
};
export type Attribute = { name: string; minRating: number; maxRating: number; rating: number };

interface CreateNewCharacterAction {
	type: typeof CREATE_NEW_CHARACTER;
}
interface LoadCharacterAction {
	type: typeof LOAD_CHARACTER;
}
export type CharacterAction = CreateNewCharacterAction | LoadCharacterAction;
