import { Action, StorageState } from '../../types';
import { saveCharacter, StorageActionTypes } from './storageActions';

const initialState: StorageState = {};

function handleSaveCharacter(storage: StorageState, { character }: ReturnType<typeof saveCharacter>) {
	return { ...storage, [character.uuid]: character };
}

export default function (storage = initialState, action: Action): StorageState {
	switch (action.type) {
		case StorageActionTypes.SAVE_CHARACTER:
			return handleSaveCharacter(storage, action);
		default:
			return storage;
	}
}
