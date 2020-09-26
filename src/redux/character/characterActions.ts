import { AttributeName } from '../../constants';
import { CharacterState } from './characterTypes';

export enum CharacterActionTypes {
	SET_CHARACTER = 'setCharacter',
	SAVE_CHARACTER = 'saveCharacter',
	CHANGE_ATTRIBUTE = 'changeAttribute',
}

export function setCharacter(loadedCharacter: CharacterState) {
	return { type: CharacterActionTypes.SET_CHARACTER, loadedCharacter } as const;
}

export function saveCharacter(increment: number) {
	return { type: CharacterActionTypes.SAVE_CHARACTER, increment } as const;
}

export function changeAttribute(attributeName: AttributeName, change: number) {
	return { type: CharacterActionTypes.CHANGE_ATTRIBUTE, attributeName, change } as const;
}

export type CharacterAction =
	| ReturnType<typeof setCharacter>
	| ReturnType<typeof saveCharacter>
	| ReturnType<typeof changeAttribute>;
