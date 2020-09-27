import { AttributeName } from '../../../constants';

interface BaseCharacter {
	saveVersion: number;
	increment: number;
	uuid: string;
	name: string;
	careerMode: boolean;
	attributes: { [attributeName in AttributeName]: Attribute };
}

interface CreationCharacter extends BaseCharacter {
	careerMode: false;
}

interface CareerCharacter extends BaseCharacter {
	careerMode: true;
}

export type Character = CreationCharacter | CareerCharacter;
export type Attribute = { name: AttributeName; minRating: number; maxRating: number; rating: number };
