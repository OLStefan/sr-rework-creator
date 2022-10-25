import { cloneDeep } from 'lodash';
import undoable, { includeAction } from 'redux-undo';
import { EditorState, EditorUiState, SectionType } from '../../types';
import { AnyAction } from '../rootReducer';
import storageActions from '../storage/storageActions';
import characterActions from './character/characterActions';
import characterReducer from './character/characterReducer';
import incrementReducer from './character/incrementReducer';
import editorActions, { EditorAction } from './editorActions';
import validateCharacter from './messages/validateCharacter';

const initialExpandedCrads = [SectionType.DETAILS];

export const initialState: EditorState = {
	messages: validateCharacter(),
	ui: {
		expandedCards: Object.fromEntries(
			// Expand only character details at start
			Object.values(SectionType).map((type) => [type, initialExpandedCrads.includes(type)]),
		) as EditorUiState['expandedCards'],
	},
};

function handleToggleCard(editor: EditorState, { cardName }: EditorAction<'toggleCard'>): EditorState {
	if (!cardName) {
		return editor;
	}
	return {
		...editor,
		ui: { ...editor.ui, expandedCards: { ...editor.ui.expandedCards, [cardName]: !editor.ui.expandedCards[cardName] } },
	};
}

function reducer(editor = initialState, action: AnyAction): EditorState {
	switch (action.type) {
		case editorActions.types.toggleCard:
			return handleToggleCard(editor, action);
		case storageActions.types.setCharacter: {
			return {
				...editor,
				messages: validateCharacter(),
				currentCharacter: characterReducer(editor.currentCharacter, action),
				ui: cloneDeep(initialState.ui),
			};
		}
		default:
			let newCharacter = characterReducer(editor.currentCharacter, action);
			if (newCharacter !== editor.currentCharacter) {
				newCharacter = incrementReducer(newCharacter, action);

				const newMessagesState = validateCharacter({
					newCharacter,
					oldCharacter: editor.currentCharacter,
					oldMessages: editor.messages,
				});
				return {
					...editor,
					currentCharacter: newCharacter,
					messages: newMessagesState,
				};
			}

			return editor;
	}
}

export default undoable(reducer, {
	filter: includeAction([...Object.values(characterActions.types)]),
	syncFilter: true,
});
