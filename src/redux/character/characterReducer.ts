import { Action } from '../rootReducer';
import { CharacterState } from './types';
import { changeAttribute, CharacterActionTypes, loadCharacter } from './characterActions';
import createNewCharacter from './createNewCharacter';

const initialState: null | CharacterState = null;

function handleLoadCharacter({ loadedCharacter }: ReturnType<typeof loadCharacter>) {
	return loadedCharacter;
}

function handleCreateNewCharacter() {
	return createNewCharacter();
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
		case CharacterActionTypes.LOAD_CHARACTER:
			return handleLoadCharacter(action);
		case CharacterActionTypes.CREATE_NEW_CHARACTER:
			return handleCreateNewCharacter();
		case CharacterActionTypes.CHANGE_ATTRIBUTE:
			return handleChangeAttribute(character, action);
		default:
			return character;
	}
}
