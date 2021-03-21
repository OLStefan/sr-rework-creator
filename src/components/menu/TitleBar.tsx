import { TFunction } from 'i18next';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { useLabels } from '../../hooks';
import { useCharacterLoaded, useCharacterName, useIsDirty } from '../../redux/selectors';
import uiActions from '../../redux/ui/uiActions';
import BurgerMenuButton from '../molecules/BurgerMenuButton';

function TitleBar({ ...otherProps }: BaseProps) {
	const dispatch = useDispatch();
	const characterLoaded = useCharacterLoaded();
	const name = useCharacterName();
	const isDirty = useIsDirty();

	const callbacks = useUpdatingCallbacks({
		onShowMenu() {
			dispatch(uiActions.showMenu());
		},
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
	height: 3rem;

	${BurgerMenuButton} {
		flex: 0 0 auto;
		height: 100%;
		aspect-ratio: 1/1;
		margin-right: var(--spacing-small);
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
