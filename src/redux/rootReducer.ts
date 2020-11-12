import { combineReducers } from 'redux';
import editorReducer from './editor/editorReducer';
import storageReducer from './storage/storageReducer';
import uiReducer from './ui/uiReducer';

export default combineReducers({ ui: uiReducer, editor: editorReducer, storage: storageReducer });
