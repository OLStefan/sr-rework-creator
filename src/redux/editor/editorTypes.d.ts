import { StateWithHistory } from 'redux-undo';
import { SectionName } from '../../constants';
import { Character } from './character/characterTypes';
import { MessagesState } from './messages/validateCharacter';

export interface EditorState {
	currentCharacter: Character | null;
	messages: MessagesState;
	expandedCards: { [x in SectionName]: boolean };
}

export type UndoableEditorState = StateWithHistory<EditorState>;
