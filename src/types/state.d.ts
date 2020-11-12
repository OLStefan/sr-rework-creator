import { StateWithHistory } from 'redux-undo';
import { UUID, Character } from '.';

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

export interface StorageState {
	[x: string]: Character;
}

export type State = {
	ui: UiState;
	editor: UndoableEditorState;
	storage: Partial<Record<UUID, Character>>;
};

export type Action = EditorAction | UiAction | StorageAction;
