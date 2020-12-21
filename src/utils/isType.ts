import { isNil } from 'lodash';

export default function isType(value: unknown, type: string) {
	return !isNil(value) && typeof value === type;
}
