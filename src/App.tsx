import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import styled from 'styled-components';
import { useUpdatingCallback, useUpdatingCallbacks } from 'use-updating-callbacks';
import Logo from './components/Background';
import CharacterEditor from './components/character/CharacterEditor';
import Dropzone from './components/Dropzone';
import SideBarMenu from './components/menu/SideBarMenu';
import TitleBar from './components/menu/TitleBar';
import { O_KEY, S_KEY, Y_KEY, Z_KEY } from './constants';
import './default.css';
import { readCharacterFile } from './redux/character/characterThunks';
import { useCharacterLoaded, useDarkMode } from './redux/selectors';

const computedStyle = getComputedStyle(document.documentElement);
const documentClassName = document.documentElement.className;

function App({ ...otherProps }) {
	const dispatch = useDispatch();
	const characterLoaded = useCharacterLoaded();
	const darkMode = useDarkMode();
	const color = computedStyle.getPropertyValue('--backgound-logo-color');

	const callbacks = useUpdatingCallbacks({
		readFile: useUpdatingCallback((file: File) => readCharacterFile(file)),
		onKeyDown: (event: React.KeyboardEvent) => {
			event.preventDefault();
			event.stopPropagation();
			if (event.ctrlKey) {
				console.log('Key', event.key);
				switch (event.key) {
					case Z_KEY:
						dispatch(ActionCreators.undo());
						break;
					case Y_KEY:
						dispatch(ActionCreators.redo());
						break;
					case S_KEY:
					case O_KEY:
				}
			}
		},
	});

	// Handle dark mode
	document.documentElement.className = `${documentClassName} ${darkMode ? 'dark' : 'bright'}`;

	return (
		<div onKeyDown={callbacks.onKeyDown} tabIndex={-1} {...otherProps}>
			{useMemo(
				() => (
					<div className="content">
						<TitleBar />
						<div className="editor">
							<Logo className="background" color={color} />
							{!characterLoaded && <Dropzone readFile={callbacks.readFile} className="dropzone" />}
							{characterLoaded && <CharacterEditor />}
						</div>
					</div>
				),
				[callbacks.readFile, characterLoaded, color],
			)}
			{useMemo(
				() => (
					<SideBarMenu />
				),
				[],
			)}
		</div>
	);
}

export default styled(App)`
	height: 100vh;
	width: 100%;
	display: grid;
	color: var(--text-on-background);

	.content {
		grid-area: 1/1;
		display: flex;
		flex-direction: column;

		${TitleBar} {
			flex: 0 0 auto;
		}

		.editor {
			min-height: 0;
			position: relative;
			flex: 1 0 0;

			.background {
				position: absolute;
				top: 0;
				left: 0;
				background-color: var(--background);
				height: 100%;
				width: 100%;
				z-index: -1;

				.logo-container {
					height: 100%;
					width: 100%;

					.logo {
						height: 100%;
						width: 100%;
						padding: var(--spacing-large);
						opacity: 0.1;
					}
				}
			}
		}
	}

	${SideBarMenu} {
		grid-area: 1/1;
	}
`;
