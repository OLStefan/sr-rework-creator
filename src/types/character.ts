import { AttributeName, CharacterState } from './enums';
import { UUID } from './uuid';

export interface Attribute {
	name: AttributeName;
	minRating: number;
	maxRating: number;
	rating: number;
}

export interface Details {
	name: string;
	player: string;
	description: string;
	background: string;
	notes: string;
	state: CharacterState;
	mugshot?: string;
}

export interface BaseCharacter {
	saveVersion: number;
	increment: number;
	uuid: UUID;
	careerMode: boolean;
	attributes: Record<AttributeName, Attribute>;
	details: Details;
}

export interface CreationCharacter extends BaseCharacter {
	careerMode: false;
}

export interface CareerCharacter extends BaseCharacter {
	careerMode: true;
}

export type Character = CreationCharacter | CareerCharacter;
