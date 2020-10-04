import undoable, { includeAction } from 'redux-undo';
import { SectionName } from '../../constants';
import { Action } from '../rootReducer';
import { CharacterActionTypes } from './character/characterActions';
import characterReducer from './character/characterReducer';
import incrementReducer from './character/incrementReducer';
import { EditorActionTypes, toggleCard } from './editorActions';
import { EditorState } from './editorTypes';
import validateCharacter, { initialState as messages } from './messages/validateCharacter';

export const initialState: EditorState = {
	currentCharacter: null,
	messages,
	expandedCards: (function () {
		const result = Object.fromEntries(Object.values(SectionName).map((name) => [name, false]));
		return result as EditorState['expandedCards'];
	})(),
};

function handleToggleCard(editor: EditorState, { cardName }: ReturnType<typeof toggleCard>) {
	if (!cardName) {
		return editor;
	}
	return { ...editor, expandedCards: { ...editor.expandedCards, [cardName]: !editor.expandedCards[cardName] } };
}

function reducer(editor = initialState, action: Action) {
	if (action.type === EditorActionTypes.TOGGLE_CARD) {
		return handleToggleCard(editor, action);
	}

	let newCharacter = characterReducer(editor.currentCharacter, action);
	if (newCharacter !== editor.currentCharacter) {
		newCharacter = incrementReducer(newCharacter, action);

		const newMessagesState = validateCharacter({
			newCharacter,
			oldCharacter: editor.currentCharacter,
			oldMessages: editor.messages,
		});
		return { ...editor, currentCharacter: newCharacter, messages: newMessagesState };
	}

	return editor;
}

export default undoable(reducer, {
	filter: includeAction([...Object.values(CharacterActionTypes)]),
	syncFilter: true,
});
