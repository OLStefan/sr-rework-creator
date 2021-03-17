import { AnyAction } from '../../rootReducer';
import storageActions, { StorageAction } from '../../storage/storageActions';
import characterActions, { CharacterAction } from './characterActions';

const initialState: Character | undefined = undefined;

function handleSetCharacter({ character }: StorageAction<'setCharacter'>) {
	return character;
}

function handleChangeAttribute(
	character: Character | undefined,
	{ attributeName, change }: CharacterAction<'changeAttribute'>,
): Character | undefined {
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

function handleSetImage(
	character: Character | undefined,
	{ base64Image }: CharacterAction<'setImage'>,
): Character | undefined {
	if (!character) {
		return character;
	}
	return { ...character, details: { ...character.details, mugshot: base64Image } };
}

export default function (character = initialState, action: AnyAction): Character | undefined {
	switch (action.type) {
		case storageActions.types.setCharacter:
			return handleSetCharacter(action);
		case characterActions.types.changeAttribute:
			return handleChangeAttribute(character, action);
		case characterActions.types.setImage:
			return handleSetImage(character, action);
		default:
			return character;
	}
}
