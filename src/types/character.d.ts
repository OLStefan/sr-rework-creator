interface Attribute {
	name: AttributeName;
	minRating: number;
	maxRating: number;
	rating: number;
}

interface Details {
	name: string;
	player: string;
	description: string;
	background: string;
	notes: string;
	state: CharacterState;
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

type Character = CreationCharacter | CareerCharacter;
