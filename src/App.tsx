import { isNil } from 'lodash';
import { useMemo } from 'react';
import { ActionCreators } from 'redux-undo';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import Logo from './components/editor/Background';
import CharacterEditor from './components/editor/CharacterEditor';
import GDPR from './components/GDPR';
import SideBarMenu from './components/menu/SideBarMenu';
import TitleBar from './components/menu/TitleBar';
import WelcomePage from './components/WelcomePage';
import { O_KEY, S_KEY, Y_KEY, Z_KEY } from './constants';
import { useAllowLocalStorage, useCharacterLoaded, useDarkMode } from './redux/selectors';
import storageActions from './redux/storage/storageActions';
import { BaseProps } from './types';
import { useDispatch } from './utils/store';

const computedStyle = getComputedStyle(document.documentElement);
const documentClassName = document.documentElement.className;

function App({ ...otherProps }: BaseProps) {
	const dispatch = useDispatch();
	const characterLoaded = useCharacterLoaded();
	const darkMode = useDarkMode();
	const allowLocalStorage = useAllowLocalStorage();
	const color = computedStyle.getPropertyValue('--backgound-logo-color');

	const callbacks = useUpdatingCallbacks({
		onKeyDown(event: React.KeyboardEvent) {
			let isHandled = false;
			if (event.ctrlKey) {
				switch (event.key) {
					case Z_KEY:
						isHandled = true;
						dispatch(ActionCreators.undo());
						break;
					case Y_KEY:
						isHandled = true;
						dispatch(ActionCreators.redo());
						break;
					case S_KEY:
						isHandled = true;
						dispatch(storageActions.saveCurrentCharacter());
						break;
					case O_KEY:
						isHandled = true;
				}
			}
			if (isHandled) {
				// Only stop the event if we handle
				event.preventDefault();
				event.stopPropagation();
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
							<Logo className="background-image" color={color} />
							{characterLoaded ? <CharacterEditor /> : <WelcomePage />}
						</div>
					</div>
				),
				[characterLoaded, color],
			)}
			{useMemo(() => isNil(allowLocalStorage) && <GDPR />, [allowLocalStorage])}
			<SideBarMenu />
		</div>
	);
}

export default styled(App)`
	height: 100%;
	width: 100%;
	display: grid;
	color: var(--text-on-background);

	& > .content {
		grid-area: 1/1;
		display: flex;
		flex-direction: column;
		min-width: 0;

		${TitleBar} {
			flex: 0 0 auto;
		}

		.editor {
			min-height: 0;
			position: relative;
			flex: 1 0 0;

			.background-image {
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

	${GDPR} {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}

	${SideBarMenu} {
		grid-area: 1/1;
	}
`;
