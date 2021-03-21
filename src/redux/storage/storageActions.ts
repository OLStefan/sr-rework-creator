import { saveAs } from 'file-saver';
import { ActionCreators } from 'redux-undo';
import { CHARCTER_FILE_TYPE } from '../../constants';
import { isCharacter } from '../../utils';
import createNewCharacter from '../editor/character/createNewCharacter';
import { getCurrentCharacter, isDirty } from '../selectors';
import { ActionCreatorBuilder, AllActions, FilterAction, Thunk } from '../actionCreators';

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
		const thunk: Thunk = (dispatch) => {
			dispatch(ActionCreators.clearHistory());
			dispatch(creators.setCharacter(createNewCharacter()));
		};
		return thunk;
	},
	loadCharacter(uuid: string) {
		const thunk: Thunk = (dispatch, getState) => {
			const character = getState().storage[uuid];
			if (character) {
				dispatch(ActionCreators.clearHistory());
				dispatch(creators.setCharacter(character));
			}
		};
		return thunk;
	},
	importCharacter(file: File) {
		const thunk: Thunk = (dispatch) => {
			file.text().then((characterJson) => {
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
					// TODO: Show error to user
				}
			});
		};

		return thunk;
	},
	saveCurrentCharacter() {
		const thunk: Thunk = (dispatch, getState) => {
			const character = getCurrentCharacter(getState());
			if (character && isDirty(getState())) {
				dispatch(creators.saveCharacter(character));
			}
		};
		return thunk;
	},
	exportCharacterFile(fileName: string) {
		const thunk: Thunk = (_, getState) => {
			const { currentCharacter: character } = getState().editor.present;
			if (character) {
				// Remove increment as it is not needed when exported

				// Spreading useed to remove attribute
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { increment, ...cleanedCharacter } = character;

				const json = JSON.stringify(cleanedCharacter, null, '\t');
				const blob = new Blob([json], { type: 'text/json;charset=utf-8' });
				saveAs(blob, `${fileName}${CHARCTER_FILE_TYPE}`);
			}
		};

		return thunk;
	},
};

export default builder.createCreators(creators, thunks);
export type StorageActions = AllActions<typeof creators>;
export type StorageAction<Type extends keyof typeof creators> = FilterAction<typeof creators, Type>;
