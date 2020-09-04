import { CREATE_NEW_CHARACTER, LOAD_CHARACTER } from './characterActionTypes';

export const createNewCharacter = () => ({ type: CREATE_NEW_CHARACTER });
export const loadCharacter = () => ({ type: LOAD_CHARACTER });
