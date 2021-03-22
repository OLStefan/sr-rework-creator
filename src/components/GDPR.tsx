import { TFunction } from 'i18next';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useUpdatingCallback } from 'use-updating-callbacks';
import { useLabels } from '../hooks';
import uiActions from '../redux/ui/uiActions';
import Button from './atoms/Button';

function GDPR({ ...otherProps }: BaseProps) {
	const dispatch = useDispatch();
	const setGdprResult = useUpdatingCallback((value: boolean) => dispatch(uiActions.setAllowStorage(value)));

	const { labels } = useLabels((t: TFunction) => ({
		yes: t('yes'),
		no: t('no'),
		allowLocalStorage: t('allowLocalStorage'),
	}));

	return useMemo(
		() => (
			<div {...otherProps}>
				<span className="text">{labels.allowLocalStorage}</span>
				<Button className="button" onClick={() => setGdprResult(true)}>
					{labels.yes}
				</Button>
				<Button className="button" onClick={() => setGdprResult(false)}>
					{labels.no}
				</Button>
			</div>
		),
		[labels, otherProps, setGdprResult],
	);
}

export default styled(GDPR)`
	font-size: var(--menu-font-size);
	background-color: var(--primary-color);
	color: var(--text-on-primary);
	display: flex;
	align-items: center;
	padding: var(--spacing-medium);

	.text {
		flex: 1 0 0;
	}

	.button {
		flex: 0 0 auto;
		padding: var(--spacing-medium);
	}
`;
