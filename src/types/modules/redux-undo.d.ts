import reduxUndo = require('redux-undo');
export = reduxUndo;
export as namespace reduxUndo;

declare global {
	type StateWithHistory<State> = reduxUndo.StateWithHistory<State>;
}
