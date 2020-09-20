import { cloneDeep } from 'lodash';
import { addErrorMessage, addHintMessage, removeErrorMessage, removeHintMessage } from './messagesActions';
import messagesReducer, { MessagesState } from './messagesReducer';

const existingSectionName = 'existing';
const messages: MessagesState = { errors: { [existingSectionName]: [] }, hints: { [existingSectionName]: [] } };

describe('test addErrorMessage', () => {
	const message = 'I am a message!';
	const sectionName = 'sectionName';

	test('add new message to section without entry', () => {
		// Arrange
		const backupState = cloneDeep(messages);
		const action = addErrorMessage(sectionName, message);

		// Act
		const result = messagesReducer(messages, action);

		// Assert
		const expectedMessages = {
			...messages,
			errors: { ...messages.errors, [sectionName]: [message] },
		};
		expect(result).toStrictEqual(expectedMessages);

		// Check for side effects
		expect(messages).toStrictEqual(backupState);
	});

	test('add new message to section with entry', () => {
		// Arrange
		const backupState = cloneDeep(messages);
		const action = addErrorMessage(existingSectionName, message);

		// Act
		const result = messagesReducer(messages, action);

		// Assert
		const expectedMessages = {
			...messages,
			errors: { ...messages.errors, [existingSectionName]: [...messages.errors[existingSectionName], message] },
		};
		expect(result).toStrictEqual(expectedMessages);

		// Check for side effects
		expect(messages).toStrictEqual(backupState);
	});

	test('try to add message again', () => {
		// Arrange
		const modifiedMessages = { ...messages, errors: { [existingSectionName]: [message] } };
		const backupState = cloneDeep(modifiedMessages);
		const action = addErrorMessage(existingSectionName, message);

		// Act
		const result = messagesReducer(modifiedMessages, action);

		// Assert
		expect(result).toBe(modifiedMessages);

		// Check for side effects
		expect(modifiedMessages).toStrictEqual(backupState);
	});
});

describe('test removeErrorMessage', () => {
	const message = 'I am a message!';
	const sectionName = 'sectionName';

	test('remove message', () => {
		// Arrange
		const modifiedMessages = { ...messages, errors: { [existingSectionName]: [message] } };
		const backupState = cloneDeep(modifiedMessages);
		const action = removeErrorMessage(existingSectionName, message);

		// Act
		const result = messagesReducer(modifiedMessages, action);

		// Assert
		expect(result).toStrictEqual(messages);

		// Check for side effects
		expect(modifiedMessages).toStrictEqual(backupState);
	});

	test('try to remove non-existing message', () => {
		// Arrange
		const backupState = cloneDeep(messages);
		const action = removeErrorMessage(existingSectionName, message);

		// Act
		const result = messagesReducer(messages, action);

		// Assert
		expect(result).toBe(messages);

		// Check for side effects
		expect(messages).toStrictEqual(backupState);
	});

	test('try to remove message from section without entry', () => {
		// Arrange
		const backupState = cloneDeep(messages);
		const action = removeErrorMessage(sectionName, message);

		// Act
		const result = messagesReducer(messages, action);

		// Assert
		expect(result).toBe(messages);

		// Check for side effects
		expect(messages).toStrictEqual(backupState);
	});
});

describe('test addHintMessage', () => {
	const message = 'I am a message!';
	const sectionName = 'sectionName';

	test('add new message to section without entry', () => {
		// Arrange
		const backupState = cloneDeep(messages);
		const action = addHintMessage(sectionName, message);

		// Act
		const result = messagesReducer(messages, action);

		// Assert
		const expectedMessages = {
			...messages,
			hints: { ...messages.hints, [sectionName]: [message] },
		};
		expect(result).toStrictEqual(expectedMessages);

		// Check for side effects
		expect(messages).toStrictEqual(backupState);
	});

	test('add new message to section with entry', () => {
		// Arrange
		const backupState = cloneDeep(messages);
		const action = addHintMessage(existingSectionName, message);

		// Act
		const result = messagesReducer(messages, action);

		// Assert
		const expectedMessages = {
			...messages,
			hints: { ...messages.hints, [existingSectionName]: [...messages.hints[existingSectionName], message] },
		};
		expect(result).toStrictEqual(expectedMessages);

		// Check for side effects
		expect(messages).toStrictEqual(backupState);
	});

	test('try to add message again', () => {
		// Arrange
		const modifiedMessages = { ...messages, hints: { [existingSectionName]: [message] } };
		const backupState = cloneDeep(modifiedMessages);
		const action = addHintMessage(existingSectionName, message);

		// Act
		const result = messagesReducer(modifiedMessages, action);

		// Assert
		expect(result).toBe(modifiedMessages);

		// Check for side effects
		expect(modifiedMessages).toStrictEqual(backupState);
	});
});

describe('test removeHintMessage', () => {
	const message = 'I am a message!';
	const sectionName = 'sectionName';

	test('remove message', () => {
		// Arrange
		const modifiedMessages = { ...messages, hints: { [existingSectionName]: [message] } };
		const backupState = cloneDeep(modifiedMessages);
		const action = removeHintMessage(existingSectionName, message);

		// Act
		const result = messagesReducer(modifiedMessages, action);

		// Assert
		expect(result).toStrictEqual(messages);

		// Check for side effects
		expect(modifiedMessages).toStrictEqual(backupState);
	});

	test('try to remove non-existing message', () => {
		// Arrange
		const backupState = cloneDeep(messages);
		const action = removeHintMessage(existingSectionName, message);

		// Act
		const result = messagesReducer(messages, action);

		// Assert
		expect(result).toBe(messages);

		// Check for side effects
		expect(messages).toStrictEqual(backupState);
	});

	test('try to remove message from section without entry', () => {
		// Arrange
		const backupState = cloneDeep(messages);
		const action = removeHintMessage(sectionName, message);

		// Act
		const result = messagesReducer(messages, action);

		// Assert
		expect(result).toBe(messages);

		// Check for side effects
		expect(messages).toStrictEqual(backupState);
	});
});
