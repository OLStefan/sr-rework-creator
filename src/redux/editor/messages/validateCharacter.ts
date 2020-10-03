import { cloneDeep, isEqual } from 'lodash';
import { AttributeName, SectionName } from '../../../constants';
import { Character } from '../character/characterTypes';

export interface MessagesState {
	errors: Partial<{ [sectionName in SectionName]: string[] }>;
	hints: Partial<{ [sectionName in SectionName]: string[] }>;
}
export const initialState: MessagesState = {
	errors: {},
	hints: {},
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
		messages.errors[SectionName.attributes] = addToMessageList(
			messages.errors[SectionName.attributes],
			'Only one attribute may be raised to its natural maximum',
		);
	}

	// TODO: Make real validation
	if (Object.values(AttributeName).reduce((prev, curr) => prev + newCharacter.attributes[curr].rating, 0) < 10) {
		messages.hints[SectionName.attributes] = addToMessageList(
			messages.hints[SectionName.attributes],
			'Spent more attribute points',
		);
	}
	return messages;
}

function addToMessageList(messageList: string[] | undefined, newMessage: string) {
	const list = messageList ?? [];
	return [...list, newMessage];
}
