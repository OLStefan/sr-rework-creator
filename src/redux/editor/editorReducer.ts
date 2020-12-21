import undoable, { includeAction } from 'redux-undo';
import { Action, EditorState, SectionName } from '../../types';
import characterActions from './character/characterActions';
import characterReducer from './character/characterReducer';
import incrementReducer from './character/incrementReducer';
import editorActions, { EditorAction } from './editorActions';
import validateCharacter, { initialState as messages } from './messages/validateCharacter';

export const initialState: EditorState = {
	currentCharacter: null,
	messages,
	expandedCards: (function () {
		const result = Object.fromEntries(Object.values(SectionName).map((name) => [name, false]));
		return result as EditorState['expandedCards'];
	})(),
};

function handleToggleCard(editor: EditorState, { cardName }: EditorAction<'toggleCard'>): EditorState {
	if (!cardName) {
		return editor;
	}
	return { ...editor, expandedCards: { ...editor.expandedCards, [cardName]: !editor.expandedCards[cardName] } };
}

function reducer(editor = initialState, action: Action): EditorState {
	if (action.type === editorActions.types.toggleCard) {
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
	filter: includeAction([...Object.values(characterActions.types)]),
	syncFilter: true,
});
