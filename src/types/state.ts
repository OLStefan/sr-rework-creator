import { StateWithHistory } from 'redux-undo';
import { Character } from './character';
import { SectionType } from './enums';
import { UUID } from './uuid';

export interface UiState {
	displayMenu: boolean;
	darkMode: boolean;
	isSelectingCharacter: boolean;
	allowLocalStorage: boolean | null;
}

export interface MessagesState {
	errors: Record<SectionType, string[]>;
	hints: Record<SectionType, string[]>;
}

export interface EditorUiState {
	expandedCards: { [x in SectionType]: boolean };
}

export interface EditorState {
	currentCharacter?: Character;
	messages: MessagesState;
	ui: EditorUiState;
}

export type UndoableEditorState = StateWithHistory<EditorState>;

export type StorageState = Partial<Record<UUID, Character>>;

export type State = {
	ui: UiState;
	editor: UndoableEditorState;
	storage: StorageState;
};
