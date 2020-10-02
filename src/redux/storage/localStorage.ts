import { cloneDeep } from 'lodash';
import { Dispatch } from 'redux';
import { initialState } from '../editor/editorReducer';
import { State } from '../rootReducer';
import { setAllowStorage } from '../ui/uiActions';

export function loadState() {
	try {
		const serializedState = localStorage.getItem('state');
		if (serializedState === null) {
			return undefined;
		}
		const state = JSON.parse(serializedState) as State;
		return state;
	} catch (err) {
		console.log('Error reading state from local storage');
		return undefined;
	}
}

export function saveState(state: State) {
	/*
	 * IMPORTANT: DO NOT USE LOCAL STORAGE UNLESS EXPLICITLY ALLOWED BY USER
	 */
	if (!state.ui.allowLocalStorage) {
		return;
	}
	try {
		const stateClone = cloneDeep(state);

		// Reset Editor
		stateClone.editor.past = [];
		stateClone.editor.present = initialState;
		stateClone.editor.future = [];

		// Reset UI
		stateClone.ui.displayMenu = false;

		const serializedState = JSON.stringify(stateClone);
		localStorage.setItem('state', serializedState);
	} catch {
		console.log('Error writing state to local storage');
		// ignore write errors
	}
}

export function clearLocalStorageThunk() {
	const thunk = (dispatch: Dispatch) => {
		dispatch(setAllowStorage(false));
		localStorage.clear();
	};

	return thunk;
}
