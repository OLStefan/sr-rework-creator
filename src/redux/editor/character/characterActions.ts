import { AttributeName } from '../../../types';

export enum CharacterActionTypes {
	CHANGE_ATTRIBUTE = 'changeAttribute',
}

export function changeAttribute(attributeName: AttributeName, change: number) {
	return { type: CharacterActionTypes.CHANGE_ATTRIBUTE, attributeName, change } as const;
}

export type CharacterActions = ReturnType<typeof changeAttribute>;
