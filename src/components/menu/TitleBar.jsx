import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import BurgerMenuButton from './BurgerMenuButton';
import { useStableCallbacks, useLabels } from '../../hooks';
import { showMenu } from '../../redux/ui/uiActions';
import { useCharacterName } from '../../selectors';

function TitleBar({ ...otherProps }) {
	const name = useCharacterName();
	const dispatch = useDispatch();
	const callbacks = useStableCallbacks({
		onShowMenu: () => dispatch(showMenu()),
	});

	const { labels } = useLabels((t) => ({
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

	& > .title-container {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: pre;
	}
`;
