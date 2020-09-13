import { LOAD_CHARACTER, CREATE_NEW_CHARACTER, CharacterAction } from './characterActions';
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

export default function (character = initialState, action: CharacterAction): CharacterState {
	switch (action.type) {
		case CREATE_NEW_CHARACTER:
			return handleCreateNewCharacter();
		case LOAD_CHARACTER:
			return handleLoadCharacter();
		default:
			return character;
	}
}
