import { Dispatch } from 'react';
import { saveAs } from 'file-saver';
import { saveCharacter, setCharacter } from './storageActions';
import { FILE_ENDING } from '../../constants';
import { isDirty } from '../selectors';
import createNewCharacter from '../editor/character/createNewCharacter';
import { ActionCreators } from 'redux-undo';
import { Action, State } from '../../types';
import isCharacter from '../../utils/isChraracter';

export function createNewCharacterThunk() {
	const thunk = (dispatch: Dispatch<Action>) => {
		dispatch(ActionCreators.clearHistory());
		dispatch(setCharacter(createNewCharacter()));
	};
	return thunk;
}

export function loadCharacterThunk(uuid: string) {
	const thunk = (dispatch: Dispatch<Action>, getState: () => State) => {
		const character = getState().storage[uuid];
		if (character) {
			dispatch(ActionCreators.clearHistory());
			dispatch(setCharacter(character));
		}
	};
	return thunk;
}

export function importCharacterThunk(file: File) {
	const thunk = (dispatch: Dispatch<Action>) => {
		const reader = new FileReader();
		reader.onload = (event: ProgressEvent<FileReader>) => {
			const characterJson = event?.target?.result;
			if (characterJson) {
				let character;
				let valid = true;
				try {
					character = JSON.parse(characterJson.toString());
					character.increment = 0;
				} catch {
					valid = false;
				}
				if (valid && isCharacter(character)) {
					// TODO: Handle character already existing
					dispatch(saveCharacter(character));
					dispatch(setCharacter(character));
				} else {
					// TODO Show error to user
				}
			}
		};
		reader.readAsText(file);
	};

	return thunk;
}

export function saveCharacterThunk() {
	const thunk = (dispatch: Dispatch<Action>, getState: () => State) => {
		const { currentCharacter: character } = getState().editor.present;
		if (character && isDirty(getState())) {
			dispatch(saveCharacter(character));
		}
	};
	return thunk;
}

export function exportCharacterFile(fileName: string) {
	const thunk = (_: Dispatch<Action>, getState: () => State) => {
		const { currentCharacter: character } = getState().editor.present;
		if (character) {
			// Remove increment and uuid as it is not needed when exported

			// Spreading useed to remove attribute
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { increment, ...cleanedCharacter } = character;

			const json = JSON.stringify(cleanedCharacter, null, '\t');
			const blob = new Blob([json], { type: 'text/json' });
			saveAs(blob, `${fileName}${FILE_ENDING}`);
		}
	};

	return thunk;
}
