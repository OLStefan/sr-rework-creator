import { AttributeName } from '../constants';
import { Attribute, Character } from '../redux/editor/character/characterTypes';

function isSet(value: unknown) {
	return value !== null && value !== undefined;
}

function isType(value: unknown, type: string) {
	return isSet(value) && typeof value === type;
}

export function isAttribute(x: unknown): x is Attribute {
	const object: Attribute = x as Attribute;
	return (
		isSet(object) &&
		isSet(object.name) &&
		Object.values(AttributeName).includes(object.name) &&
		isSet(object.minRating) &&
		isSet(object.maxRating) &&
		isSet(object.rating)
	);
}

export function isCharacter(x: unknown): x is Character {
	const object: Character = x as Character;
	return (
		isSet(object) &&
		isType(object.saveVersion, 'number') &&
		isType(object.increment, 'number') &&
		isType(object.uuid, 'string') &&
		isType(object.name, 'string') &&
		isType(object.careerMode, 'boolean') &&
		isSet(object.attributes) &&
		Object.values(AttributeName).every((key) => isAttribute(object.attributes[key]))
	);
}
