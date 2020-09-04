import React, { useMemo } from 'react';
import styled from 'styled-components';
import CharacterEditor from './components/character/CharacterEditor';
import SideBarMenu from './components/menu/SideBarMenu';
import TitleBar from './components/menu/TitleBar';
import './default.css';
import { useDarkMode, useCharacterLoaded } from './selectors';
import Logo from './components/Logo';

const computedStyle = getComputedStyle(document.documentElement);
const documentClassName = document.documentElement.className;

function App({ ...otherProps }) {
	const characterLoaded = useCharacterLoaded();
	const darkMode = useDarkMode();
	const color = computedStyle.getPropertyValue('--backgound-logo-color');

	// Handle dark mode
	document.documentElement.className = `${documentClassName} ${darkMode ? 'dark' : 'bright'}`;

	return (
		<div {...otherProps}>
			{useMemo(
				() => (
					<div className="wrapper">
						<TitleBar />
						<div className="content">
							<Logo className="logo" color={color} />
							{characterLoaded && <CharacterEditor />}
						</div>
					</div>
				),
				[characterLoaded, color],
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
	width: 100vw;
	height: 100vh;
	display: grid;
	background-color: var(--background);
	color: var(--text-on-background);

	& > .wrapper {
		grid-area: 1/1;
		display: flex;
		flex-direction: column;
		height: 100%;

		${TitleBar} {
			flex: 0 0 auto;
		}

		& > .content {
			position: relative;
			flex: 1 1 0;
			overflow: auto;

			& > .logo {
				padding: var(--spacing-large);
				position: absolute;
				top: 0;
				left: 0;
				height: 100%;
				width: 100%;
				opacity: 0.1;
			}
		}
	}

	& > ${SideBarMenu} {
		grid-area: 1/1;
	}
`;
