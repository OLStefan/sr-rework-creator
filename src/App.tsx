import React, { useMemo } from 'react';
import styled from 'styled-components';
import CharacterEditor from './components/character/CharacterEditor';
import SideBarMenu from './components/menu/SideBarMenu';
import TitleBar from './components/menu/TitleBar';
import { useDarkMode, useCharacterLoaded } from './redux/selectors';
import Logo from './components/Background';
import Dropzone from './components/Dropzone';
import { useUpdatingCallback } from 'use-updating-callbacks';
import { readCharacterFile } from './redux/character/characterThunks';
import './default.css';

const computedStyle = getComputedStyle(document.documentElement);
const documentClassName = document.documentElement.className;

function App({ ...otherProps }) {
	const characterLoaded = useCharacterLoaded();
	const darkMode = useDarkMode();
	const color = computedStyle.getPropertyValue('--backgound-logo-color');

	const readFile = useUpdatingCallback((file: File) => readCharacterFile(file));

	// Handle dark mode
	document.documentElement.className = `${documentClassName} ${darkMode ? 'dark' : 'bright'}`;

	return (
		<div {...otherProps}>
			{useMemo(
				() => (
					<div className="content">
						<TitleBar />
						<div className="editor">
							<Logo className="background" color={color} />
							{!characterLoaded && <Dropzone readFile={readFile} className="dropzone" />}
							{characterLoaded && <CharacterEditor />}
						</div>
					</div>
				),
				[characterLoaded, color, readFile],
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
