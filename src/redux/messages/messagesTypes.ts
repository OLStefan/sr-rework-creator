export const ADD_ERROR_MESSAGE = 'addErrorMessage';
export const ADD_HINT_MESSAGE = 'addHintMessage';

// Types
export interface MessagesState {
	errors: { [sectionName: string]: string };
	hints: { [sectionName: string]: string };
}

interface AddErrorMessageAction {
	type: typeof ADD_ERROR_MESSAGE;
	card: string;
}
interface AddHintMessageAction {
	type: typeof ADD_HINT_MESSAGE;
	card: string;
}

export type MessagesAction = AddErrorMessageAction | AddHintMessageAction;
