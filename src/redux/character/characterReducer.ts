import { Action } from '../rootReducer';
import { CharacterState } from './characterTypes';
import { changeAttribute, CharacterActionTypes, setCharacter } from './characterActions';

const initialState: null | CharacterState = null;

function handleSetCharacter({ loadedCharacter }: ReturnType<typeof setCharacter>) {
	return loadedCharacter;
}

function handleChangeAttribute(
	character: CharacterState,
	{ attributeName, change }: ReturnType<typeof changeAttribute>,
) {
	if (!character || !character.attributes[attributeName]) {
		return character;
	}

	const attribute = character.attributes[attributeName];

	const newRating = Math.min(Math.max(attribute.rating + change, attribute.minRating), attribute.maxRating);

	if (newRating === attribute.rating) {
		return character;
	}

	return {
		...character,
		attributes: {
			...character.attributes,
			[attributeName]: { ...character.attributes[attributeName], rating: newRating },
		},
	};
}

export default function (character = initialState, action: Action): CharacterState {
	switch (action.type) {
		case CharacterActionTypes.SET_CHARACTER:
			return handleSetCharacter(action);
		case CharacterActionTypes.CHANGE_ATTRIBUTE:
			return handleChangeAttribute(character, action);
		default:
			return character;
	}
}
