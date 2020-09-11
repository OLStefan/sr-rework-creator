import React, { useMemo } from 'react';
import styled from 'styled-components';
import CharacterEditor from './components/character/CharacterEditor';
import SideBarMenu from './components/menu/SideBarMenu';
import TitleBar from './components/menu/TitleBar';
import './default.css';
import { useDarkMode, useCharacterLoaded } from './redux/selectors';
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
					<Logo className="background" color={color} />
				),
				[color],
			)}
			{useMemo(
				() => (
					<div className="wrapper">
						<TitleBar />
						<div className="content">{characterLoaded && <CharacterEditor />}</div>
					</div>
				),
				[characterLoaded],
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
	display: grid;
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
			flex: 1 1 0;
			overflow: auto;
			height: 100%;
		}
	}

	& > ${SideBarMenu} {
		grid-area: 1/1;
	}

	& > .background {
		grid-area: 1/1;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		display: grid;
		place-content: center;
		background-color: var(--background);
		height: 100%;
		width: 100%;
		z-index: -1;
		padding-top: var(--title-bar-font-size);

		& > svg {
			opacity: 0.1;
		}
	}
`;
