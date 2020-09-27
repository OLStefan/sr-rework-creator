import { Dispatch } from 'react';
import { saveAs } from 'file-saver';
import { isCharacter } from '../../utils/typeguards';
import { saveCharacter, setCharacter } from './storageActions';
import { FILE_ENDING } from '../../constants';
import { Action, State } from '../rootReducer';
import { isDirty } from '../selectors';
import createNewCharacter from '../editor/character/createNewCharacter';
import { ActionCreators } from 'redux-undo';

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
				const character = JSON.parse(characterJson.toString());
				if (isCharacter(character)) {
					console.log('valid character');
					dispatch(saveCharacter(character));
					dispatch(setCharacter(character));
				} else {
					console.log('invalid file');
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
			const json = JSON.stringify(character, null, '\t');
			const blob = new Blob([json], { type: 'text/json' });
			saveAs(blob, `${fileName}${FILE_ENDING}`);
		}
	};

	return thunk;
}