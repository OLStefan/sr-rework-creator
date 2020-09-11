import { ATTRIBUTES } from '../../constants';
import { MessagesAction, MessagesState } from './messagesTypes';

const initialState: MessagesState = { errors: { [ATTRIBUTES]: 'Alles FALSCH!' }, hints: {} };

export default function (error = initialState, action: MessagesAction): MessagesState {
	switch (action.type) {
		default:
			return error;
	}
}
