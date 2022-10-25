import { StorageState } from '../../types';
import type { AnyAction } from '../rootReducer';
import storageActions, { StorageAction } from './storageActions';

const initialState: StorageState = {};

function handleSaveCharacter(storage: StorageState, { character }: StorageAction<'saveCharacter'>): StorageState {
	return { ...storage, [character.uuid]: character };
}

export default function (storage = initialState, action: AnyAction): StorageState {
	switch (action.type) {
		case storageActions.types.saveCharacter:
			return handleSaveCharacter(storage, action);
		default:
			return storage;
	}
}
