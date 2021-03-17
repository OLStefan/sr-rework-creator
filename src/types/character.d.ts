interface Attribute {
	name: import('./enums').AttributeName;
	minRating: number;
	maxRating: number;
	rating: number;
}

interface Details {
	name: string;
	mugshot?: string;
}

interface BaseCharacter {
	saveVersion: number;
	increment: number;
	uuid: UUID;
	careerMode: boolean;
	attributes: Record<import('./enums').AttributeName, Attribute>;
	details: Details;
}

interface CreationCharacter extends BaseCharacter {
	careerMode: false;
}

interface CareerCharacter extends BaseCharacter {
	careerMode: true;
}

type Character = CreationCharacter | CareerCharacter;
