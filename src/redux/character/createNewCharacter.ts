import { v4 as uuid } from 'uuid';
import { AttributeName } from '../../constants';
import { CharacterState } from './characterTypes';

export default function (): CharacterState {
	return {
		saveVersion: 0.1,
		name: '',
		uuid: uuid(),
		careerMode: false,
		attributes: {
			[AttributeName.strength]: { name: AttributeName.strength, minRating: 1, maxRating: 6, rating: 1 },
			[AttributeName.agility]: { name: AttributeName.agility, minRating: 1, maxRating: 6, rating: 2 },
			[AttributeName.body]: { name: AttributeName.body, minRating: 1, maxRating: 6, rating: 3 },
			[AttributeName.intelligence]: { name: AttributeName.intelligence, minRating: 1, maxRating: 6, rating: 4 },
			[AttributeName.willpower]: { name: AttributeName.willpower, minRating: 1, maxRating: 6, rating: 5 },
			[AttributeName.charisma]: { name: AttributeName.charisma, minRating: 1, maxRating: 6, rating: 6 },
		},
	};
}
