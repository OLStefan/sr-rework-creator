import {
	ATTRIBUTE_STRENGTH,
	ATTRIBUTE_AGILITY,
	ATTRIBUTE_BODY,
	ATTRIBUTE_CHARISMA,
	ATTRIBUTE_WILLPOWER,
	ATTRIBUTE_INTELLIGENCE,
} from '../../constants';

export default function () {
	return {
		name: 'New Character',
		careerMode: false,
		attributes: {
			[ATTRIBUTE_STRENGTH]: { name: ATTRIBUTE_STRENGTH, minRating: 1, maxRating: 6, rating: 1 },
			[ATTRIBUTE_AGILITY]: { name: ATTRIBUTE_AGILITY, minRating: 1, maxRating: 6, rating: 2 },
			[ATTRIBUTE_BODY]: { name: ATTRIBUTE_BODY, minRating: 1, maxRating: 6, rating: 3 },
			[ATTRIBUTE_INTELLIGENCE]: { name: ATTRIBUTE_INTELLIGENCE, minRating: 1, maxRating: 6, rating: 4 },
			[ATTRIBUTE_WILLPOWER]: { name: ATTRIBUTE_WILLPOWER, minRating: 1, maxRating: 6, rating: 5 },
			[ATTRIBUTE_CHARISMA]: { name: ATTRIBUTE_CHARISMA, minRating: 1, maxRating: 6, rating: 6 },
		},
	};
}
