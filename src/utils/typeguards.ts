/* Any is explicitly allowed here, since all this meethods are for typechecking any object */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AttributeName } from '../constants';
import { Attribute, Character } from '../redux/editor/character/characterTypes';

function isSet(value: any) {
	return value !== null && value !== undefined;
}

function isType(value: any, type: string) {
	return isSet(value) && typeof value === type;
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

export function isCharacter(object: any): object is Character {
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
