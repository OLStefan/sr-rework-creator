import { StateWithHistory } from 'redux-undo';
import { UUID, Character } from '.';
import { EditorAction } from '../redux/editor/editorActions';
import { StorageAction } from '../redux/storage/storageActions';
import { UiAction } from '../redux/ui/uiActions';

export interface UiState {
	displayMenu: boolean;
	darkMode: boolean;
	isSelectingCharacter: boolean;
	allowLocalStorage: boolean | null;
}

export enum SectionName {
	DETAILS = 'details',
	QUALITIES = 'qualities',
	ATTRIBUTES = 'attributes',
	SKILLS = 'skills',
	SPELLS = 'spells',
	WEAPONS = 'weapons',
	ARMOR = 'armor',
	GEAR = 'gear',
	DRONES = 'drones',
	VEHICLES = 'vehicles',
	LIFESTYLES = 'lifestyles',
	CONTACTS = 'contacts',
}

export interface MessagesState {
	errors: Record<SectionName, string[]>;
	hints: Record<SectionName, string[]>;
}

export interface EditorState {
	currentCharacter: Character | null;
	messages: MessagesState;
	expandedCards: { [x in SectionName]: boolean };
}

export type UndoableEditorState = StateWithHistory<EditorState>;

export type StorageState = Partial<Record<UUID, Character>>;

export type State = {
	ui: UiState;
	editor: UndoableEditorState;
	storage: StorageState;
};

export type Action = EditorAction | UiAction | StorageAction;
