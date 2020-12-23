import { UUID } from '.';

export enum AttributeName {
	STRENGTH = 'strength',
	AGILITY = 'agility',
	BODY = 'body',
	INTELLIGENCE = 'intelligence',
	WILLPOWER = 'willpower',
	CHARISMA = 'charisma',
}
export interface Attribute {
	name: AttributeName;
	minRating: number;
	maxRating: number;
	rating: number;
}

export interface Details {
	name: string;
	mugshot?: string;
}

interface BaseCharacter {
	saveVersion: number;
	increment: number;
	uuid: UUID;
	careerMode: boolean;
	attributes: Record<AttributeName, Attribute>;
	details: Details;
}

interface CreationCharacter extends BaseCharacter {
	careerMode: false;
}

interface CareerCharacter extends BaseCharacter {
	careerMode: true;
}

export type Character = CreationCharacter | CareerCharacter;
