interface UiState {
	displayMenu: boolean;
	darkMode: boolean;
	isSelectingCharacter: boolean;
	allowLocalStorage: boolean | null;
}

interface MessagesState {
	errors: Record<import('./enums').SectionName, string[]>;
	hints: Record<import('./enums').SectionName, string[]>;
}

interface EditorState {
	currentCharacter?: Character;
	messages: MessagesState;
	expandedCards: { [x in import('./enums').SectionName]: boolean };
}

type UndoableEditorState = import('redux-undo').StateWithHistory<EditorState>;

type StorageState = Partial<Record<UUID, Character>>;

type State = {
	ui: UiState;
	editor: UndoableEditorState;
	storage: StorageState;
};
