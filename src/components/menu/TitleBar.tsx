import { TFunction } from 'i18next';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { useLabels } from '../../hooks';
import { useCharacterName } from '../../redux/selectors';
import { showMenu } from '../../redux/ui/uiActions';
import BurgerMenuButton from './BurgerMenuButton';

function TitleBar({ ...otherProps }) {
	const name = useCharacterName();
	const dispatch = useDispatch();
	const callbacks = useUpdatingCallbacks({
		onShowMenu: () => dispatch(showMenu()),
	});

	const { labels } = useLabels((t: TFunction) => ({
		title: t('appName'),
	}));

	return (
		<div {...otherProps}>
			{useMemo(
				() => (
					<BurgerMenuButton onClick={callbacks.onShowMenu} />
				),
				[callbacks.onShowMenu],
			)}
			<div className="title-container">{name || labels.title}</div>
		</div>
	);
}

export default styled(TitleBar)`
	background-color: var(--primary-color);
	color: var(--text-on-primary);
	display: flex;
	align-items: center;
	font-size: var(--title-bar-font-size);
	width: 100%;

	& > ${BurgerMenuButton} {
		flex: 0 0 auto;
	}

	& > .title-container {
		flex: 1 0 0;
		width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: pre;
	}
`;
