import { Action } from '../../rootReducer';
import { setCharacter, StorageActionTypes } from '../../storage/storageActions';
import { changeAttribute, CharacterActionTypes } from './characterActions';
import { Character } from './characterTypes';

const initialState: Character | null = null;

function handleSetCharacter({ character }: ReturnType<typeof setCharacter>) {
	return character;
}

function handleChangeAttribute(
	character: Character | null,
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

export default function (character = initialState, action: Action) {
	switch (action.type) {
		case StorageActionTypes.SET_CHARACTER:
			return handleSetCharacter(action);
		case CharacterActionTypes.CHANGE_ATTRIBUTE:
			return handleChangeAttribute(character, action);
		default:
			return character;
	}
}
