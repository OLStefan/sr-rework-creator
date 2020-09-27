import { Character } from '../editor/character/characterTypes';

export enum StorageActionTypes {
	SET_CHARACTER = 'setCharacter',
	SAVE_CHARACTER = 'saveCharacter',
}

export function setCharacter(character: Character) {
	return { type: StorageActionTypes.SET_CHARACTER, character } as const;
}

export function saveCharacter(character: Character) {
	return { type: StorageActionTypes.SAVE_CHARACTER, character } as const;
}

export type StorageAction = ReturnType<typeof setCharacter> | ReturnType<typeof saveCharacter>;
