export const ADD_ERROR_MESSAGE = 'addErrorMessage';
export const ADD_HINT_MESSAGE = 'addHintMessage';

interface AddErrorMessageAction {
	type: typeof ADD_ERROR_MESSAGE;
	card: string;
}
export function addErrorMessage(cardName: string) {
	return { type: ADD_ERROR_MESSAGE, cardName };
}

interface AddHintMessageAction {
	type: typeof ADD_HINT_MESSAGE;
	card: string;
}
export function addHintMessage(cardName: string) {
	return { type: ADD_HINT_MESSAGE, cardName };
}

export type MessagesAction = AddErrorMessageAction | AddHintMessageAction;
