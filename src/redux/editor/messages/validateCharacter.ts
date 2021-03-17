import { cloneDeep, isEqual } from 'lodash';

const initialState: MessagesState = {
	errors: Object.fromEntries<string[]>(Object.values(SectionName).map((name) => [name, []])) as MessagesState['errors'],
	hints: Object.fromEntries<string[]>(Object.values(SectionName).map((name) => [name, []])) as MessagesState['hints'],
};

export default function ({
	oldCharacter,
	newCharacter,
	oldMessages,
}: {
	oldCharacter?: Character;
	newCharacter?: Character;
	oldMessages?: MessagesState;
} = {}) {
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
		messages.errors[SectionName.ATTRIBUTES].push('Only one attribute may be raised to its natural maximum');
	}

	// TODO: Make real validation
	if (Object.values(AttributeName).reduce((prev, curr) => prev + newCharacter.attributes[curr].rating, 0) < 10) {
		messages.hints[SectionName.ATTRIBUTES].push('Spent more attribute points');
	}
	return messages;
}
