interface UiState {
	displayMenu: boolean;
	darkMode: boolean;
	isSelectingCharacter: boolean;
	allowLocalStorage: boolean | null;
}

interface MessagesState {
	errors: Record<SectionType, string[]>;
	hints: Record<SectionType, string[]>;
}

interface EditorUiState {
	expandedCards: { [x in SectionType]: boolean };
}

interface EditorState {
	currentCharacter?: Character;
	messages: MessagesState;
	ui: EditorUiState;
}

type UndoableEditorState = StateWithHistory<EditorState>;

type StorageState = Partial<Record<UUID, Character>>;

type State = {
	ui: UiState;
	editor: UndoableEditorState;
	storage: StorageState;
};
