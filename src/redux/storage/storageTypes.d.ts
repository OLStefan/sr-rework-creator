import { Character } from '../editor/character/characterTypes';

export interface StorageState {
	[x: string]: Character;
}
