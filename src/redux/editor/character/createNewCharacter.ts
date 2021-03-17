import { v4 as uuid } from 'uuid';
import { AttributeName } from '../../../types';

export default function (): Character {
	return {
		saveVersion: 0.1,
		increment: 0,
		uuid: uuid(),
		careerMode: false,
		attributes: {
			[AttributeName.STRENGTH]: { name: AttributeName.STRENGTH, minRating: 1, maxRating: 6, rating: 1 },
			[AttributeName.AGILITY]: { name: AttributeName.AGILITY, minRating: 1, maxRating: 6, rating: 2 },
			[AttributeName.BODY]: { name: AttributeName.BODY, minRating: 1, maxRating: 6, rating: 3 },
			[AttributeName.INTELLIGENCE]: { name: AttributeName.INTELLIGENCE, minRating: 1, maxRating: 6, rating: 4 },
			[AttributeName.WILLPOWER]: { name: AttributeName.WILLPOWER, minRating: 1, maxRating: 6, rating: 5 },
			[AttributeName.CHARISMA]: { name: AttributeName.CHARISMA, minRating: 1, maxRating: 6, rating: 6 },
		},
		details: { name: '' },
	};
}
