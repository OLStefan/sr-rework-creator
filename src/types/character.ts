import { UUID } from '.';

export enum AttributeName {
	STRENGTH = 'strength',
	AGILITY = 'agility',
	BODY = 'body',
	INTELLIGENCE = 'intelligence',
	WILLPOWER = 'willpower',
	CHARISMA = 'charisma',
}
export type Attribute = { name: AttributeName; minRating: number; maxRating: number; rating: number };

interface BaseCharacter {
	saveVersion: number;
	increment: number;
	uuid: UUID;
	name: string;
	careerMode: boolean;
	attributes: Record<AttributeName, Attribute>;
}

interface CreationCharacter extends BaseCharacter {
	careerMode: false;
}

interface CareerCharacter extends BaseCharacter {
	careerMode: true;
}

export type Character = CreationCharacter | CareerCharacter;
