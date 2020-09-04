import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export function useLabels(labelsFunction, ...args) {
	const { t } = useTranslation(...args);

	return useMemo(
		() => ({
			t,
			labels: labelsFunction(t),
		}),
		// labelsFunction is missing because the labelsFunction needs to be pure and is never meant to be updated
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[t],
	);
}

function replaceCallbacks(getObject) {
	const newObject = {};
	const object = getObject();
	Object.keys(object).forEach((key) => {
		if (typeof object[key] === 'function') {
			newObject[key] = (...args) => getObject()[key](...args);
		} else {
			newObject[key] = replaceCallbacks(() => getObject()[key]);
		}
	});
	return newObject;
}

export function useStableCallbacks(callbacks) {
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

export function useStableCallback(callback) {
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	});

	return callbackRef.current;
}
