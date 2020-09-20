import { ATTRIBUTES, DETAILS } from '../../constants';
import {
	ADD_ERROR_MESSAGE,
	ADD_HINT_MESSAGE,
	MessagesAction,
	REMOVE_ERROR_MESSAGE,
	REMOVE_HINT_MESSAGE,
	AddErrorMessageAction,
	RemoveErrorMessageAction,
	AddHintMessageAction,
	RemoveHintMessageAction,
} from './messagesActions';

export interface MessagesState {
	errors: { [sectionName: string]: string[] };
	hints: { [sectionName: string]: string[] };
}
const initialState: MessagesState = {
	errors: { [ATTRIBUTES]: ['Alles FALSCH!', 'Noch mehr falsch'] },
	hints: { [DETAILS]: ['No Name'] },
};

function handleAddErrorMessage(messages: MessagesState, { sectionName, message }: AddErrorMessageAction) {
	if (!messages.errors[sectionName]) {
		return { ...messages, errors: { ...messages.errors, [sectionName]: [message] } };
	}

	if (messages.errors[sectionName].includes(message)) {
		return messages;
	}

	return { ...messages, errors: { ...messages.errors, [sectionName]: [...messages.errors[sectionName], message] } };
}

function handleRemoveErrorMessage(messages: MessagesState, { sectionName, message }: RemoveErrorMessageAction) {
	if (!messages.errors[sectionName]?.includes(message)) {
		return messages;
	}
	return {
		...messages,
		errors: {
			...messages.errors,
			[sectionName]: messages.errors[sectionName].filter((aMessage) => aMessage !== message),
		},
	};
}

function handleAddHintMessage(messages: MessagesState, { sectionName, message }: AddHintMessageAction) {
	if (!messages.hints[sectionName]) {
		return { ...messages, hints: { ...messages.hints, [sectionName]: [message] } };
	}

	if (messages.hints[sectionName].includes(message)) {
		return messages;
	}
	return { ...messages, hints: { ...messages.hints, [sectionName]: [...messages.hints[sectionName], message] } };
}

function handleHintRemoveErrorMessage(messages: MessagesState, { sectionName, message }: RemoveHintMessageAction) {
	if (!messages.hints[sectionName]?.includes(message)) {
		return messages;
	}
	return {
		...messages,
		hints: { ...messages.hints, [sectionName]: messages.hints[sectionName].filter((aMessage) => aMessage !== message) },
	};
}

export default function (messages = initialState, action: MessagesAction): MessagesState {
	switch (action.type) {
		case ADD_ERROR_MESSAGE:
			return handleAddErrorMessage(messages, action);
		case REMOVE_ERROR_MESSAGE:
			return handleRemoveErrorMessage(messages, action);
		case ADD_HINT_MESSAGE:
			return handleAddHintMessage(messages, action);
		case REMOVE_HINT_MESSAGE:
			return handleHintRemoveErrorMessage(messages, action);
		default:
			return messages;
	}
}
