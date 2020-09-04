import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Switch from 'react-switch';
import styled from 'styled-components';
import { ESCAPE_KEY } from '../../constants';
import { useLabels, useStableCallbacks } from '../../hooks';
import { createNewCharacter } from '../../redux/character/characterActions';
import { changeDarkMode, hideMenu } from '../../redux/ui/uiActions';
import { useDarkMode, useDisplayMenu } from '../../selectors';

function SideBarMenu({ ...otherProps }) {
	const displayMenu = useDisplayMenu();
	const darkMode = useDarkMode();

	const dispatch = useDispatch();
	const ref = useRef();

	const callbacks = useStableCallbacks({
		onHide: () => dispatch(hideMenu()),
		onSwitchDarkMode: () => dispatch(changeDarkMode()),
	});

	const { labels } = useLabels((t) => ({
		newCharacter: t('newCharacter'),
		save: t('save'),
		saveAs: t('saveAs'),
		open: t('open'),
		darkMode: t('darkMode'),
	}));

	// Set Focus on dislplay
	useEffect(() => {
		if (displayMenu) {
			ref.current.focus();
		}
	}, [displayMenu]);

	// Handle hide on escape key
	const onKeyDown = (event) => {
		if (event.key === ESCAPE_KEY) {
			callbacks.onHide();
		}
	};

	// Handle focus loss on element or children
	const onBlur = (event) => {
		if (displayMenu && !event.currentTarget.contains(event.relatedTarget)) {
			callbacks.onHide();
		}
	};

	return (
		<div {...otherProps}>
			{displayMenu && (
				<div className="menu" ref={ref} tabIndex={-1} {...{ onKeyDown, onBlur }}>
					<div className="button-container">
						<button className="close-button" type="button" onClick={callbacks.onHide}>
							X
						</button>
					</div>
					<div className="content">
						<button type="button" onClick={() => dispatch(createNewCharacter())}>
							{labels.newCharacter}
						</button>
						<button type="button">{labels.save}</button>
						<button type="button">{labels.saveAs}</button>
						<button type="button">{labels.open}</button>
						<div className="filler" />
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

	.menu {
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

		.button-container {
			flex: 0 0 auto;
			display: flex;
			justify-content: flex-end;

			.close-button {
				padding: 0 var(--spacing-medium);
			}
		}

		.content {
			flex: 1 0 auto;
			display: flex;
			flex-direction: column;

			button {
				padding: var(--spacing-medium);
				width: 100%;
			}

			button {
				text-align: left;
			}

			.dark-mode {
				padding: var(--spacing-medium);
				width: 100%;

				display: flex;
				align-items: center;

				.dark-mode-label {
					color: var(--text-on-primary);
				}
			}
		}
	}
`;
