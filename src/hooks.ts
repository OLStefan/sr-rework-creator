import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export function useLabels(labelsFunction: any, ...args: any[]) {
	const { t } = useTranslation(...args);

	return useMemo(
		() => ({
			t,
			labels: labelsFunction(t),
		}),
		// labelsFunction not needed, it is never meant to be updated
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[t],
	);
}

function replaceCallbacks(getObject: (...args: any[]) => any): any {
	const newObject: { [x: string]: any } = {};
	const object = getObject();
	Object.keys(object).forEach((key: string) => {
		if (typeof object[key] === 'function') {
			newObject[key] = (...args: any[]) => getObject()[key](...args);
		} else {
			newObject[key] = replaceCallbacks(() => getObject()[key]);
		}
	});
	return newObject;
}

export function useStableCallbacks(callbacks: any): any {
	const callbackRefs = useRef(callbacks);

	useEffect(() => {
		callbackRefs.current = callbacks;
	});

	const stableCallbacks = useRef();
	if (!stableCallbacks.current) {
		stableCallbacks.current = replaceCallbacks(() => callbackRefs.current);
	}

	return stableCallbacks.current;
}
