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
		const cards: any = {};
		Object.values(SectionName).forEach((name) => (cards[name] = name === SectionName.details));
		return cards;
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

	const newCharacter = incrementReducer(characterReducer(editor.currentCharacter, action), action);
	const newMessagesState = validateCharacter({
		newCharacter,
		oldCharacter: editor.currentCharacter,
		oldMessages: editor.messages,
	});

	return { ...editor, currentCharacter: newCharacter, messages: newMessagesState };
}

export default undoable(reducer, {
	filter: includeAction([...Object.values(CharacterActionTypes)]),
	syncFilter: true,
});
