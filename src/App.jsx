import React, { useMemo } from 'react';
import styled from 'styled-components';
import CharacterEditor from './components/character/CharacterEditor';
import SideBarMenu from './components/menu/SideBarMenu';
import TitleBar from './components/TitleBar';
import './default.css';
import { useDarkMode, useCharacterLoaded } from './selectors';
import Logo from './components/Logo';

// used in styling
// eslint-disable-next-line no-unused-vars
function App({ className, ...otherProps }) {
	const characterLoaded = useCharacterLoaded();
	const darkMode = useDarkMode();

	return (
		<div className={`${className} ${darkMode ? 'dark' : 'bright'}`} {...otherProps}>
			{useMemo(
				() => (
					<div className="wrapper">
						<TitleBar />
						<div className="content">
							<Logo className="logo" color="grey" />
							{characterLoaded && <CharacterEditor />}
						</div>
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
	display: grid;
	height: 100vh;
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
