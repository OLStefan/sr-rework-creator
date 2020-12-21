import { Action, Character } from '../../../types';
import storageActions, { StorageAction } from '../../storage/storageActions';
import characterActions, { CharacterAction } from './characterActions';

const initialState: Character | null = null;

function handleSetCharacter({ character }: StorageAction<'setCharacter'>) {
	return character;
}

function handleChangeAttribute(
	character: Character | null,
	{ attributeName, change }: CharacterAction<'changeAttribute'>,
): Character | null {
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

export default function (character = initialState, action: Action): Character | null {
	switch (action.type) {
		case storageActions.types.setCharacter:
			return handleSetCharacter(action);
		case characterActions.types.changeAttribute:
			return handleChangeAttribute(character, action);
		default:
			return character;
	}
}
