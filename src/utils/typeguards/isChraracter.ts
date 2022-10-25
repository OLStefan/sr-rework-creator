import { isNil } from 'lodash';
import { AttributeName, Character } from '../../types';
import isAttribute from './isAttribute';
import isType from './isType';

export default function isCharacter(x: unknown): x is Character {
	const object: Character = x as Character;
	return (
		!isNil(object) &&
		isType(object.saveVersion, 'number') &&
		isType(object.increment, 'number') &&
		isType(object.uuid, 'string') &&
		isType(object.careerMode, 'boolean') &&
		!isNil(object.attributes) &&
		Object.values(AttributeName).every((key) => isAttribute(object.attributes[key])) &&
		!isNil(object.details) &&
		isType(object.details.name, 'string')
	);
}
