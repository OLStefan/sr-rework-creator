import { isNil } from 'lodash';
import { Attribute, AttributeName } from '../types';
import isType from './isType';

export default function isAttribute(x: unknown): x is Attribute {
	const object: Attribute = x as Attribute;
	return (
		!isNil(object) &&
		isType(object.name, 'string') &&
		Object.values(AttributeName).includes(object.name) &&
		isType(object.minRating, 'number') &&
		isType(object.maxRating, 'number') &&
		isType(object.rating, 'number')
	);
}
