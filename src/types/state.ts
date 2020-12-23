import { StateWithHistory } from 'redux-undo';
import { Character, UUID } from '.';
import { CharacterActions } from '../redux/editor/character/characterActions';
import { EditorActions } from '../redux/editor/editorActions';
import { StorageActions } from '../redux/storage/storageActions';
import { UiActions } from '../redux/ui/uiActions';

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
	currentCharacter?: Character;
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

export type Action = EditorActions | CharacterActions | UiActions | StorageActions;
