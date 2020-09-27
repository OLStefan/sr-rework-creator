import { Action } from '../rootReducer';
import { saveCharacter, StorageActionTypes } from './storageActions';
import { StorageState } from './storageTypes';

const initialState: StorageState = {};

function handleSaveCharacter(storage: StorageState, { character }: ReturnType<typeof saveCharacter>) {
	return { ...storage, [character.uuid]: character };
}

export default function (storage = initialState, action: Action) {
	switch (action.type) {
		case StorageActionTypes.SAVE_CHARACTER:
			return handleSaveCharacter(storage, action);
		default:
			return storage;
	}
}
