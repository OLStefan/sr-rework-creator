import { noop } from 'lodash';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Switch from 'react-switch';
import styled from 'styled-components';
import { ESCAPE_KEY } from '../../constants';
import { useLabels, useStableCallbacks } from '../../hooks';
import { createNewCharacter } from '../../redux/character/characterActions';
import { changeDarkMode, hideMenu } from '../../redux/ui/uiActions';
import { useCharacterLoaded, useDarkMode, useDisplayMenu } from '../../redux/selectors';
import Button from '../atoms/Button';

function SideBarMenu({ ...otherProps }) {
	const displayMenu = useDisplayMenu();
	const darkMode = useDarkMode();
	const characterLoaded = useCharacterLoaded();

	const dispatch = useDispatch();
	const ref = useRef<any>();

	const callbacks: any = useStableCallbacks({
		onHide: () => dispatch(hideMenu()),
		onSwitchDarkMode: () => dispatch(changeDarkMode()),
	});

	const { labels } = useLabels((t: any) => ({
		newCharacter: t('newCharacter'),
		save: t('save'),
		saveAs: t('saveAs'),
		open: t('open'),
		darkMode: t('darkMode'),
	}));

	// Set Focus on dislplay
	useEffect(() => {
		if (displayMenu && ref?.current) {
			ref.current.focus();
		}
	}, [displayMenu]);

	// Handle hide on escape key
	const onKeyDown = (event: any) => {
		if (event.key === ESCAPE_KEY) {
			callbacks.onHide();
		}
	};

	// Handle focus loss on element or children
	const onBlur = (event: any) => {
		if (displayMenu && !event.currentTarget.contains(event.relatedTarget)) {
			callbacks.onHide();
		}
	};

	return (
		<div {...otherProps}>
			<div className={`filler ${displayMenu ? 'background' : ''}`} />
			{displayMenu && (
				<div className="menu" ref={ref} tabIndex={-1} {...{ onKeyDown, onBlur }}>
					<div className="button-container">
						<Button className="close-button" onClick={callbacks.onHide}>
							X
						</Button>
					</div>
					<div className="content">
						<Button onClick={() => dispatch(createNewCharacter())}>{labels.newCharacter}</Button>
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
					</div>
				</div>
			)}
		</div>
	);
}

export default styled(SideBarMenu)`
	width: 100%;
	height: 100%;
	z-index: 1000000;
	pointer-events: none;
	position: relative;

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

		.divider {
			height: var(--menu-divider-height);
			width: 95%;
			border-radius: var(--border-radius);
			background-color: var(--text-on-primary);
			transform: translateX(2.5%);
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

			& > ${Button} {
				border-radius: none;
				text-align: left;
				padding: var(--spacing-medium);
				width: 100%;
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
