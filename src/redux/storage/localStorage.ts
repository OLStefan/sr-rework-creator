import { cloneDeep } from 'lodash';
import { initialState } from '../editor/editorReducer';
import { State } from '../rootReducer';

export function loadState() {
	try {
		const serializedState = localStorage.getItem('state');
		if (serializedState === null) {
			console.log('No persisted state found');
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
		console.log('State persisted');
	} catch {
		console.log('Error writing state to local storage');
		// ignore write errors
	}
}
