import { combineReducers } from 'redux';
import { CharacterActions } from './editor/character/characterActions';
import { EditorActions } from './editor/editorActions';
import editorReducer from './editor/editorReducer';
import { StorageActions } from './storage/storageActions';
import storageReducer from './storage/storageReducer';
import { UiActions } from './ui/uiActions';
import uiReducer from './ui/uiReducer';

export type AnyAction = EditorActions | CharacterActions | UiActions | StorageActions;

export default combineReducers({ ui: uiReducer, editor: editorReducer, storage: storageReducer });
