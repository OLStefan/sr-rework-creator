import { AttributeName } from '../../constants';

interface BaseCharacter {
	saveVersion: number;
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

export type CharacterState = CreationCharacter | CareerCharacter | null;
export type Attribute = { name: AttributeName; minRating: number; maxRating: number; rating: number };
