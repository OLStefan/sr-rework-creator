import { isEqual } from 'lodash';
import { SectionName } from '../../constants';
import { Action } from '../rootReducer';
import { CharacterState } from './types';

export interface MessagesState {
	errors: { [sectionName in SectionName]: string[] };
	hints: { [sectionName in SectionName]: string[] };
}
const initialState: MessagesState = {
	errors: (function () {
		const cards: any = {};
		Object.values(SectionName).forEach((name) => (cards[name] = []));
		return cards;
	})(),
	hints: (function () {
		const cards: any = {};
		Object.values(SectionName).forEach((name) => (cards[name] = []));
		return cards;
	})(),
};

export default function ({
	oldCharacter,
	newCharacter,
	oldMessages,
	action,
}: {
	oldCharacter?: CharacterState;
	oldMessages?: MessagesState;
	newCharacter: CharacterState;
	action: Action;
}): MessagesState {
	if (isEqual(oldCharacter, newCharacter) || !newCharacter) {
		return oldMessages || initialState;
	}

	console.log('Validate Character here');
	return initialState;
}
