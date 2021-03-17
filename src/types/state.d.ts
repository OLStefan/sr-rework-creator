interface UiState {
	displayMenu: boolean;
	darkMode: boolean;
	isSelectingCharacter: boolean;
	allowLocalStorage: boolean | null;
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

type UndoableEditorState = StateWithHistory<EditorState>;

type StorageState = Partial<Record<UUID, Character>>;

type State = {
	ui: UiState;
	editor: UndoableEditorState;
	storage: StorageState;
};
