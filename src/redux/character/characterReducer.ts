import { LOAD_CHARACTER, CREATE_NEW_CHARACTER, CharacterAction, CHANGE_ATTRIBUTE } from './characterActions';
import createNewCharacter from './createNewCharacter';

export type CharacterState = null | {
	name: string;
	careerMode: boolean;
	attributes: { [attributeName: string]: Attribute };
};
export type Attribute = { name: string; minRating: number; maxRating: number; rating: number };
const initialState: CharacterState = null;

function handleCreateNewCharacter() {
	return createNewCharacter();
}

function handleLoadCharacter() {
	return createNewCharacter();
}

function handleChangeAttribute(
	character: CharacterState,
	{ attributeName, change }: { attributeName: string; change: number },
) {
	if (!character || !character.attributes[attributeName]) {
		return character;
	}

	const attribute = character.attributes[attributeName];

	const newRating = Math.min(Math.max(attribute.rating + change, attribute.minRating), attribute.maxRating);

	return {
		...character,
		attributes: {
			...character.attributes,
			[attributeName]: { ...character.attributes[attributeName], rating: newRating },
		},
	};
}

export default function (character = initialState, action: CharacterAction): CharacterState {
	switch (action.type) {
		case CREATE_NEW_CHARACTER:
			return handleCreateNewCharacter();
		case LOAD_CHARACTER:
			return handleLoadCharacter();
		case CHANGE_ATTRIBUTE:
			return handleChangeAttribute(character, action);
		default:
			return character;
	}
}
