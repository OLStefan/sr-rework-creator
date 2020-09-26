import { CharacterAction } from './character/characterActions';
import characterReducer from './character/characterReducer';
import validateCharacter, { MessagesState } from './character/validateCharacter';
import { UiAction } from './ui/uiActions';
import uiReducer from './ui/uiReducer';
import undoable, { StateWithHistory } from 'redux-undo';
import { CharacterState } from './character/types';
import { UiState } from './ui/types';

type State = { ui: UiState; character?: CharacterState; messages: MessagesState };
export type UndoableState = StateWithHistory<State>;
export type Action = CharacterAction | UiAction;

function rootReducer(state: State | undefined, action: Action) {
	const newCharacter = characterReducer(state?.character, action);
	const newUiState = uiReducer(state?.ui, action);
	const newMessagesState = validateCharacter({
		oldCharacter: state?.character,
		newCharacter,
		oldMessages: state?.messages,
	});

	return { ui: newUiState, character: newCharacter, messages: newMessagesState };
}

const undoableReducer = undoable(rootReducer);

export default undoableReducer;
