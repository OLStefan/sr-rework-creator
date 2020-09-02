import { combineReducers } from 'redux';
import characterReducer from './character/characterReducer';
import uiReducer from './ui/uiReducer';

const rootReducer = combineReducers({
	character: characterReducer,
	ui: uiReducer,
});

export default function (state, action) {
	// catch unhandled unexpected exceptions and save in error state
	try {
		return rootReducer(state, action);
	} catch (error) {
		return {
			...state,
			error,
		};
	}
}
