import { Character } from '../../../types';
import { AnyAction } from '../../rootReducer';
import storageActions from '../../storage/storageActions';
import uiActions from '../../ui/uiActions';

const initialState: Character | undefined = undefined;

export default function (character = initialState, action: AnyAction): Character | undefined {
	if (!character) {
		return character;
	}

	if (uiActions.isUiAction(action) || storageActions.isStorageAction(action)) {
		return character;
	}

	return { ...character, increment: character.increment + 1 };
}
