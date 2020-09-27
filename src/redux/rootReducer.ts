import { combineReducers } from 'redux';
import { Character } from './editor/character/characterTypes';
import { EditorAction } from './editor/editorActions';
import editorReducer from './editor/editorReducer';
import { UndoableEditorState } from './editor/editorTypes';
import { StorageAction } from './storage/storageActions';
import storageReducer from './storage/storageReducer';
import { UiAction } from './ui/uiActions';
import uiReducer from './ui/uiReducer';
import { UiState } from './ui/uiTypes';

export type State = {
	ui: UiState;
	editor: UndoableEditorState;
	storage: { [x: string]: Character };
};
export type Action = EditorAction | UiAction | StorageAction;

export default combineReducers({ ui: uiReducer, editor: editorReducer, storage: storageReducer });
