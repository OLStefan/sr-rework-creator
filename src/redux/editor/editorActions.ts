import { SectionName } from '../../types';
import { CharacterActions } from './character/characterActions';

export enum EditorActionTypes {
	TOGGLE_CARD = 'toggleCard',
}

export function toggleCard(cardName: SectionName) {
	return { type: EditorActionTypes.TOGGLE_CARD, cardName } as const;
}

export type EditorAction = ReturnType<typeof toggleCard> | CharacterActions;
