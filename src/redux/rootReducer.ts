import { combineReducers } from 'redux';
import characterReducer from './character/characterReducer';
import messagesReducer from './messages/messagesReducer';
import uiReducer from './ui/uiReducer';

const rootReducer = combineReducers({
	character: characterReducer,
	ui: uiReducer,
	messages: messagesReducer,
});

export type State = ReturnType<typeof rootReducer>;

export default rootReducer;
