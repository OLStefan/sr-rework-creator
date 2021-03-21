import { TFunction } from 'i18next';
import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUpdatingCallback } from 'use-updating-callbacks';

export function useMount(func: React.EffectCallback) {
	// useEffect should only be called once on mount
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(func, []);
}

// Paramters are just forwarded
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useUpdate(func: (...args: any[]) => void, dependencies: React.DependencyList) {
	const isDoneMounting = useRef(false);
	const stableFunc = useUpdatingCallback(func);

	useEffect(() => {
		if (!isDoneMounting.current) {
			isDoneMounting.current = true;
		} else {
			stableFunc();
		}
		// Dependencies are just forwarded
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...dependencies, stableFunc]);
}

/**
 * @param {*} keys Array of attributes that should trigger a rerender on change
 */
interface ContentRect extends Box {
	top: number;
	right: number;
	bottom: number;
	left: number;
}
export function useResizeObserver<T extends HTMLElement>(keys?: (keyof ContentRect)[]) {
	const container = useRef<T>(null);
	const [contentRect, setContentRect] = useState<ContentRect>({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
	});

	useEffect(() => {
		if (container.current) {
			// window.requestAnimationFrame is necessary here to fix the error "ResizeObserver loop limit exceeded" that happens during SystemTest execution.
			// For whatever reason it will only occur when the developer tools are not opened.
			// The error is not going to break the site, but it breaks the SystemTest execution, so it had to be fixed.
			// Refer to https://stackoverflow.com/a/58701523 for the fix and more details.
			let oldState: Partial<ContentRect> = {};
			const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
				if (entries.length) {
					// Checked beforehand
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					const { contentRect: contentRectInternal } = entries[0]!;
					// Resize Observer also notices when the component is being unmounted and will fire with a last update using fallback values
					// This is not something we ever need to listen to (as the unmounted component no longer manages its state which is being set here)
					// It would produce a "Can't perform a react state update on an unmounted component"-error.
					// The error is used to catch possible memory leaks, which does not apply here as the observer is properly disconnected afterwards
					if (container.current) {
						if (keys) {
							if (keys.some((key) => contentRectInternal[key] !== oldState[key])) {
								oldState = contentRectInternal;
								window.requestAnimationFrame(() => setContentRect(contentRectInternal));
							}
						} else {
							window.requestAnimationFrame(() => setContentRect(contentRectInternal));
						}
					}
				}
			});
			observer.observe(container.current);

			// arrow function is necessary here
			// "observer.disconnect" would not work in some cases (e.g. TabPanel switch) due to "this" binding
			// Possible other workarounds include:
			// observer.disconnect.bind(observer);
			// ResizeObserver.prototype.disconnect.bind(observer);
			// new ResizeObserver(() => {}).disconnect.bind(observer);
			return () => observer.disconnect();
		}

		return undefined;
		// Allows developers to not have to memo the key list
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return [container, contentRect] as const;
}

export function useMultipleRefs<T>(refs: React.Ref<T>[]) {
	return useCallback(
		(reference: T) => {
			refs.forEach((ref) => {
				if (!ref) {
					return;
				}
				if (typeof ref === 'function') {
					ref(reference);
				} else {
					// Warnign disabled because assigning is explicitly what we want to do here
					// eslint-disable-next-line no-param-reassign
					const mutableRef = ref as MutableRefObject<T>;
					mutableRef.current = reference;
				}
			});
		},
		// refs is an array and we only want to update based on the array contents, not on the array itself
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[...refs],
	);
}

export function useLabels<T>(
	labelsFunction: (t: TFunction) => T,
	...args: Parameters<typeof useTranslation>
): { t: TFunction; labels: T } {
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
