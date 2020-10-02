import { cloneDeep, isEqual } from 'lodash';
import { AttributeName, SectionName } from '../../../constants';
import { Character } from '../character/characterTypes';

export interface MessagesState {
	errors: { [sectionName in SectionName]: string[] };
	hints: { [sectionName in SectionName]: string[] };
}
export const initialState: MessagesState = {
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
}: {
	oldCharacter: Character | null;
	newCharacter: Character | null;
	oldMessages: MessagesState | null;
}) {
	if (!newCharacter) {
		return initialState;
	}
	if (isEqual(oldCharacter, newCharacter) || !newCharacter) {
		return oldMessages || initialState;
	}

	const messages = cloneDeep(initialState);

	const maxedAttributes = Object.values(AttributeName).filter(
		(attribute) => newCharacter.attributes[attribute].rating >= newCharacter.attributes[attribute].maxRating,
	);

	if (maxedAttributes.length > 1) {
		messages.errors[SectionName.attributes].push('Only one attribute may be raised to its natural maximum');
	}

	// TODO: Make real validation
	if (Object.values(AttributeName).reduce((prev, curr) => prev + newCharacter.attributes[curr].rating, 0) < 10) {
		messages.hints[SectionName.attributes].push('Spent more attribute points');
	}
	return messages;
}
