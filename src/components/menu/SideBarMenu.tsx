import { noop } from 'lodash';
import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Switch from 'react-switch';
import styled from 'styled-components';
import { ESCAPE_KEY } from '../../constants';
import { useLabels } from '../../hooks';
import { createNewCharacter } from '../../redux/character/characterActions';
import { changeDarkMode, hideMenu } from '../../redux/ui/uiActions';
import { useCharacterLoaded, useDarkMode, useDisplayMenu } from '../../redux/selectors';
import Button from '../atoms/Button';
import { TFunction } from 'i18next';
import { useUpdatingCallbacks } from 'use-updating-callbacks';

interface Props {
	className?: string;
}
function SideBarMenu({ className, ...otherProps }: Props) {
	const displayMenu = useDisplayMenu();
	const darkMode = useDarkMode();
	const characterLoaded = useCharacterLoaded();

	const dispatch = useDispatch();

	const callbacks = useUpdatingCallbacks({
		onHide: () => dispatch(hideMenu()),
		onSwitchDarkMode: () => dispatch(changeDarkMode()),
		createNewCharacter: () => dispatch(createNewCharacter()),
		onKeyDown: (event: React.KeyboardEvent) => {
			if (event.key === ESCAPE_KEY) {
				callbacks.onHide();
			}
		},
		onBlur: (event: React.FocusEvent) => {
			if (displayMenu && event.target !== ref.current) {
				callbacks.onHide();
			}
		},
	});

	const { labels } = useLabels((t: TFunction) => ({
		newCharacter: t('newCharacter'),
		save: t('save'),
		saveAs: t('saveAs'),
		open: t('open'),
		darkMode: t('darkMode'),
	}));

	// Set Focus on dislplay
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (displayMenu && ref.current) {
			ref.current.focus();
		}
	}, [displayMenu]);

	return (
		<div className={`${className} ${displayMenu ? '' : 'hidden'}`} {...otherProps}>
			<div className={`filler ${displayMenu ? 'background' : ''}`} />

			<div className="menu" ref={ref} tabIndex={-1} onKeyDown={callbacks.onKeyDown} onBlur={callbacks.onBlur}>
				{useMemo(
					() => (
						<div className="button-container">
							<Button className="close-button" onClick={callbacks.onHide}>
								X
							</Button>
						</div>
					),
					[callbacks.onHide],
				)}
				<div className="content">
					{useMemo(
						() => (
							<>
								<Button onClick={callbacks.createNewCharacter}>{labels.newCharacter}</Button>
								<Button onClick={noop}>{labels.open}</Button>
								<div className="divider" />
								<Button disabled={!characterLoaded} onClick={noop}>
									{labels.save}
								</Button>
								<Button disabled={!characterLoaded} onClick={noop}>
									{labels.saveAs}
								</Button>
								<div className="filler" />
								<div className="divider" />
							</>
						),
						[callbacks.createNewCharacter, characterLoaded, labels],
					)}
					{useMemo(
						() => (
							<div className="dark-mode">
								<span className="dark-mode-label">{labels.darkMode}</span>
								<span className="filler" />
								<Switch
									onColor="#205774"
									offColor="#aaa"
									checkedIcon={false}
									uncheckedIcon={false}
									checked={darkMode}
									onChange={callbacks.onSwitchDarkMode}
								/>
							</div>
						),
						[callbacks.onSwitchDarkMode, darkMode, labels.darkMode],
					)}
				</div>
			</div>
		</div>
	);
}

export default styled(SideBarMenu)`
	width: 100%;
	height: 100%;
	z-index: 1000000;
	pointer-events: none;
	position: relative;

	&.hidden {
		display: none;
	}

	& > .menu {
		font-size: var(--menu-font-size);
		height: 100%;
		width: 25%;
		min-width: var(--menu-min-width);
		background-color: var(--primary-color);
		display: flex;
		flex-direction: column;
		outline: none;
		pointer-events: all;

		.filler {
			flex: 1 0 0;
		}

		& > .button-container {
			flex: 0 0 auto;
			display: flex;
			justify-content: flex-end;

			.close-button {
				padding: 0 var(--spacing-medium);
			}
		}

		& > .content {
			flex: 1 0 auto;
			display: flex;
			flex-direction: column;
			align-items: center;

			& > ${Button} {
				border-radius: 0;
				text-align: left;
				padding: var(--spacing-medium);
				width: 100%;
			}

			.divider {
				width: 95%;
				border-radius: var(--border-radius);
				background-color: var(--text-on-primary);
				flex: 0 0 var(--menu-divider-height);
			}

			& > .dark-mode {
				padding: var(--spacing-medium);
				width: 100%;

				display: flex;
				align-items: center;

				& > .dark-mode-label {
					color: var(--text-on-primary);
				}
			}
		}
	}

	& > .filler {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transition: background-color var(--long-animation-duration);
		z-index: -1;

		&.background {
			background-color: hsla(0, 0%, 0%, 0.3);
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		& > .menu {
			animation: menu-slide 1 var(--long-animation-duration) linear;
		}
	}

	@keyframes menu-slide {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(0%);
		}
	}
`;
