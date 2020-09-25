import { AttributeName } from '../constants';
import { Attribute, CharacterState } from '../redux/character/types';

export function isCharacter(object: any): object is CharacterState {
	return (
		isSet(object) &&
		isType(object.saveVersion, 'number') &&
		isType(object.name, 'string') &&
		isType(object.careerMode, 'boolean') &&
		isSet(object.attributes) &&
		Object.values(AttributeName).every((key) => isAttribute(object.attributes[key]))
	);
}

export function isAttribute(object: any): object is Attribute {
	return (
		isSet(object) &&
		isSet(object.name) &&
		Object.values(AttributeName).includes(object.name) &&
		isSet(object.minRating) &&
		isSet(object.maxRating) &&
		isSet(object.rating)
	);
}

function isType(value: any, type: string) {
	return isSet(value) && typeof value === type;
}

function isSet(value: any) {
	return value !== null && value !== undefined;
}
