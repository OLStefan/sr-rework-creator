import { AttributeName } from '../../../constants';

export enum CharacterActionTypes {
	CHANGE_ATTRIBUTE = 'changeAttribute',
}

export function changeAttribute(attributeName: AttributeName, change: number) {
	return { type: CharacterActionTypes.CHANGE_ATTRIBUTE, attributeName, change } as const;
}

export type CharacterAction = ReturnType<typeof changeAttribute>;