import { TFunction } from 'i18next';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { useLabels } from '../../hooks';
import { useCharacterLoaded, useCharacterName, useIsDirty } from '../../redux/selectors';
import { showMenu } from '../../redux/ui/uiActions';
import BurgerMenuButton from '../generic/molecules/BurgerMenuButton';

function TitleBar({ ...otherProps }: {}) {
	const dispatch = useDispatch();
	const characterLoaded = useCharacterLoaded();
	const name = useCharacterName();
	const isDirty = useIsDirty();

	const callbacks = useUpdatingCallbacks({
		onShowMenu: () => dispatch(showMenu()),
	});

	const { labels } = useLabels((t: TFunction) => ({
		appName: t('appName'),
		newCharacter: t('newCharacter'),
	}));
	const title = characterLoaded ? name || labels.newCharacter : labels.appName;

	return (
		<div {...otherProps} data-component="title-bar">
			{useMemo(
				() => (
					<BurgerMenuButton onClick={callbacks.onShowMenu} />
				),
				[callbacks.onShowMenu],
			)}
			<div className="title-container">{title}</div>
			<div className="dirty">{isDirty ? '*' : ''}</div>
		</div>
	);
}

export default styled(TitleBar)`
	background-color: var(--primary-color);
	color: var(--text-on-primary);
	display: flex;
	align-items: center;
	font-size: var(--title-bar-font-size);

	${BurgerMenuButton} {
		flex: 0 0 auto;
	}

	.title-container {
		flex: 0 1 auto;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: pre;
	}

	.dirty {
		flex: 0 0 auto;
	}
`;
