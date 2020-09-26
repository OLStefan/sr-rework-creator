import { cloneDeep, isEqual } from 'lodash';
import { AttributeName, SectionName } from '../../constants';
import { CharacterState } from './characterTypes';

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
}: {
	oldCharacter?: CharacterState;
	newCharacter: CharacterState;
	oldMessages?: MessagesState;
}): MessagesState {
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

	console.log('Validate Character here');
	return messages;
}
