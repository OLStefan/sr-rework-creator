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
			[ATTRIBUTE_STRENGTH]: { minValue: 1, maxValue: 6, currentValue: 1 },
			[ATTRIBUTE_AGILITY]: { minValue: 1, maxValue: 6, currentValue: 1 },
			[ATTRIBUTE_BODY]: { minValue: 1, maxValue: 6, currentValue: 1 },
			[ATTRIBUTE_CHARISMA]: { minValue: 1, maxValue: 6, currentValue: 1 },
			[ATTRIBUTE_WILLPOWER]: { minValue: 1, maxValue: 6, currentValue: 1 },
			[ATTRIBUTE_INTELLIGENCE]: { minValue: 1, maxValue: 6, currentValue: 1 },
		},
		skills: {
			athletics: { rating: 0, attribute: ATTRIBUTE_STRENGTH, spec: '' },
		},
	};
}
