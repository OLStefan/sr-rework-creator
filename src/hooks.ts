import { TFunction } from 'i18next';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

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
