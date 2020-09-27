import { SectionName } from '../../constants';
import { CharacterAction } from './character/characterActions';

export enum EditorActionTypes {
	TOGGLE_CARD = 'toggleCard',
}

export function toggleCard(cardName: keyof typeof SectionName) {
	return { type: EditorActionTypes.TOGGLE_CARD, cardName } as const;
}

export type EditorAction = ReturnType<typeof toggleCard> | CharacterAction;
