import { saveAs } from 'file-saver';
import { Dispatch } from 'redux';
import { ActionCreators } from 'redux-undo';
import { FILE_ENDING } from '../../constants';
import { Action, ActionCreatorBuilder, AllActions, Character, FilterAction, State } from '../../types';
import isCharacter from '../../utils/isChraracter';
import createNewCharacter from '../editor/character/createNewCharacter';
import { getCurrentCharacter, isDirty } from '../selectors';

export const STORAGE_NAMESPACE = 'StorageActions';
export const STORAGE_TYPEGUARD = 'isStorageAction';

const builder = new ActionCreatorBuilder(STORAGE_NAMESPACE, STORAGE_TYPEGUARD);

const creators = {
	setCharacter(character: Character) {
		return { type: builder.createType('setCharacter'), character } as const;
	},
	saveCharacter(character: Character) {
		return { type: builder.createType('saveCharacter'), character } as const;
	},
};

const thunks = {
	createNewCharacter() {
		const thunk = (dispatch: Dispatch<Action>) => {
			dispatch(ActionCreators.clearHistory());
			dispatch(creators.setCharacter(createNewCharacter()));
		};
		return thunk;
	},
	loadCharacter(uuid: string) {
		const thunk = (dispatch: Dispatch<Action>, getState: () => State) => {
			const character = getState().storage[uuid];
			if (character) {
				dispatch(ActionCreators.clearHistory());
				dispatch(creators.setCharacter(character));
			}
		};
		return thunk;
	},
	importCharacter(file: File) {
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
						dispatch(creators.saveCharacter(character));
						dispatch(creators.setCharacter(character));
					} else {
						// TODO Show error to user
					}
				}
			};
			reader.readAsText(file);
		};

		return thunk;
	},
	saveCurrentCharacter() {
		const thunk = (dispatch: Dispatch<Action>, getState: () => State) => {
			const character = getCurrentCharacter(getState());
			if (character && isDirty(getState())) {
				dispatch(creators.saveCharacter(character));
			}
		};
		return thunk;
	},
	exportCharacterFile(fileName: string) {
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
	},
};

export default builder.createCreators(creators, thunks);
export type StorageActions = AllActions<typeof creators>;
export type StorageAction<Type extends keyof typeof creators> = FilterAction<typeof creators, Type>;
