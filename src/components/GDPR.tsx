import { TFunction } from 'i18next';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useUpdatingCallback } from 'use-updating-callbacks';
import { useLabels } from '../hooks';
import { setAllowStorage } from '../redux/ui/uiActions';
import Button from './atoms/Button';

function GDPR({ ...otherProps }) {
	const dispatch = useDispatch();
	const setGdprResult = useUpdatingCallback((value: boolean) => dispatch(setAllowStorage(value)));

	const { labels } = useLabels((t: TFunction) => ({
		yes: t('yes'),
		no: t('no'),
		allowLocalStorage: t('allowLocalStorage'),
	}));

	return (
		<div {...otherProps}>
			<span className="text">{labels.allowLocalStorage}</span>
			<Button className="button" onClick={() => setGdprResult(true)}>
				{labels.yes}
			</Button>
			<Button className="button" onClick={() => setGdprResult(false)}>
				{labels.no}
			</Button>
		</div>
	);
}

export default styled(GDPR)`
	width: 100%;
	min-height: 3em;
	font-size: var(--menu-font-size);
	background-color: var(--primary-color);
	color: var(--text-on-primary);
	display: flex;
	align-items: center;

	.text {
		padding: 0 1ch;
		flex: 1 0 0;
	}

	.button {
		flex: 0 0 auto;
		padding: 0 1ch;
		height: 2em;
	}
`;
