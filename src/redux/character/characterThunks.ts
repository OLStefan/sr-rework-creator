import { Dispatch } from 'react';
import { saveAs } from 'file-saver';
import { isCharacter } from '../../utils/typeguards';
import { UndoableState } from '../rootReducer';
import { loadCharacter } from './characterActions';

export function readCharacterFile(file: File) {
	const thunk = (dispatch: Dispatch<any>) => {
		const reader = new FileReader();
		reader.onload = (event: ProgressEvent<FileReader>) => {
			const characterJson = event?.target?.result;
			if (characterJson) {
				const character = JSON.parse(characterJson.toString());
				if (isCharacter(character)) {
					console.log('valid character');
					dispatch(loadCharacter(character));
				} else {
					console.log('invalid file');
				}
			}
		};
		reader.readAsText(file);
	};

	return thunk;
}

export function exportCharacterFile(fileName: string) {
	const thunk = (_: any, getState: () => UndoableState) => {
		const { character } = getState().present;
		if (character) {
			const json = JSON.stringify(character, null, '\t');
			const blob = new Blob([json], { type: 'text/json' });
			saveAs(blob, `${fileName}.srchar`);
		}
	};

	return thunk;
}
