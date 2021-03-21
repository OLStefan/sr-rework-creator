import { inBound } from '../../../utils';
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
	const newRating = inBound(attribute.rating + change, attribute.minRating, attribute.maxRating);

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

function handleChangeDetail(
	character: Character | undefined,
	{ attribute, newValue }: CharacterAction<'changeDetail'>,
): Character | undefined {
	if (!character) {
		return character;
	}

	if (character.details[attribute] === newValue) {
		return character;
	}

	return {
		...character,
		details: { ...character.details, [attribute]: newValue },
	};
}

function handleChangeState(
	character: Character | undefined,
	{ newState }: CharacterAction<'changeState'>,
): Character | undefined {
	if (!character) {
		return character;
	}

	if (character.details.state === newState) {
		return character;
	}

	return {
		...character,
		details: { ...character.details, state: newState },
	};
}

function handleSetImage(
	character: Character | undefined,
	{ base64Image }: CharacterAction<'setMugshot'>,
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
		case characterActions.types.changeDetail:
			return handleChangeDetail(character, action);
		case characterActions.types.changeState:
			return handleChangeState(character, action);
		case characterActions.types.setMugshot:
			return handleSetImage(character, action);
		default:
			return character;
	}
}
