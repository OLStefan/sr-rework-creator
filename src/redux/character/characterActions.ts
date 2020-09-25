import { AttributeName } from '../../constants';
import { CharacterState } from './types';

export enum CharacterActionTypes {
	CREATE_NEW_CHARACTER = 'createNewCharacter',
	LOAD_CHARACTER = 'loadCharacter',
	SAVE_CHARACTER = 'saveCharacter',
	CHANGE_ATTRIBUTE = 'changeAttribute',
}

export function createNewCharacter() {
	return { type: CharacterActionTypes.CREATE_NEW_CHARACTER } as const;
}

export function loadCharacter(loadedCharacter: CharacterState) {
	return { type: CharacterActionTypes.LOAD_CHARACTER, loadedCharacter } as const;
}

export function saveCharacter(increment: number) {
	return { type: CharacterActionTypes.SAVE_CHARACTER, increment } as const;
}

export function changeAttribute(attributeName: AttributeName, change: number) {
	return { type: CharacterActionTypes.CHANGE_ATTRIBUTE, attributeName, change } as const;
}

export type CharacterAction =
	| ReturnType<typeof createNewCharacter>
	| ReturnType<typeof loadCharacter>
	| ReturnType<typeof saveCharacter>
	| ReturnType<typeof changeAttribute>;
