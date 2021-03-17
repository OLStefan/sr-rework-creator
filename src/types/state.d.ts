interface UiState {
	displayMenu: boolean;
	darkMode: boolean;
	isSelectingCharacter: boolean;
	allowLocalStorage: boolean | null;
}

enum SectionName {
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

interface MessagesState {
	errors: Record<SectionName, string[]>;
	hints: Record<SectionName, string[]>;
}

interface EditorState {
	currentCharacter?: Character;
	messages: MessagesState;
	expandedCards: { [x in SectionName]: boolean };
}

type UndoableEditorState = import('redux-undo').StateWithHistory<EditorState>;

type StorageState = Partial<Record<UUID, Character>>;

type State = {
	ui: UiState;
	editor: UndoableEditorState;
	storage: StorageState;
};
