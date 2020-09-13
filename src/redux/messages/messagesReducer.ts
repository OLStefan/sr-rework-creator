import { ATTRIBUTES } from '../../constants';
import { MessagesAction } from './messagesActions';

export interface MessagesState {
	errors: { [sectionName: string]: string };
	hints: { [sectionName: string]: string };
}
const initialState: MessagesState = { errors: { [ATTRIBUTES]: 'Alles FALSCH!' }, hints: {} };

export default function (error = initialState, action: MessagesAction): MessagesState {
	switch (action.type) {
		default:
			return error;
	}
}
