export const ADD_ERROR_MESSAGE = 'addErrorMessage';
export const REMOVE_ERROR_MESSAGE = 'removeErrorMessage';
export const ADD_HINT_MESSAGE = 'addHintMessage';
export const REMOVE_HINT_MESSAGE = 'removeHintMessage';

export interface AddErrorMessageAction {
	type: typeof ADD_ERROR_MESSAGE;
	sectionName: string;
	message: string;
}
export function addErrorMessage(sectionName: string, message: string): AddErrorMessageAction {
	return { type: ADD_ERROR_MESSAGE, sectionName, message };
}

export interface RemoveErrorMessageAction {
	type: typeof REMOVE_ERROR_MESSAGE;
	sectionName: string;
	message: string;
}
export function removeErrorMessage(sectionName: string, message: string): RemoveErrorMessageAction {
	return { type: REMOVE_ERROR_MESSAGE, sectionName, message };
}

export interface AddHintMessageAction {
	type: typeof ADD_HINT_MESSAGE;
	sectionName: string;
	message: string;
}
export function addHintMessage(sectionName: string, message: string): AddHintMessageAction {
	return { type: ADD_HINT_MESSAGE, sectionName, message };
}

export interface RemoveHintMessageAction {
	type: typeof REMOVE_HINT_MESSAGE;
	sectionName: string;
	message: string;
}
export function removeHintMessage(sectionName: string, message: string): RemoveHintMessageAction {
	return { type: REMOVE_HINT_MESSAGE, sectionName, message };
}

export type MessagesAction =
	| AddErrorMessageAction
	| RemoveErrorMessageAction
	| AddHintMessageAction
	| RemoveHintMessageAction;
