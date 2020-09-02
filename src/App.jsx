import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import BurgerMenuButton from './components/menu/BurgerMenuButton';
import SideBarMenu from './components/menu/SideBarMenu';
import SpinningLogo from './components/SpinningLogo';
import './default.css';
import { useStableCallbacks } from './hooks';
import { hideMenu, showMenu } from './redux/ui/uiActions';

// used in styling
// eslint-disable-next-line no-unused-vars
function App({ className, ...otherProps }) {
	const { darkMode, displayMenu } = useSelector((state) => state.ui);
	const dispatch = useDispatch();
	const callbacks = useStableCallbacks({
		show: () => dispatch(showMenu()),
		hide: () => dispatch(hideMenu()),
		renderMenu: () => (
			<>
				<button className="menu-entry" type="button">
					Menu Entry 1
				</button>
				<button className="menu-entry" type="button">
					Menu Entry 2
				</button>
				<button className="menu-entry" type="button">
					Menu Entry 3
				</button>
			</>
		),
	});

	return (
		<div className={`${className} ${darkMode ? 'dark' : 'bright'}`} {...otherProps}>
			<div className="wrapper">
				{useMemo(
					() => (
						<div className="title-bar">
							<BurgerMenuButton onClick={callbacks.show} />
							<div className="title-container">I am a title bar!</div>
						</div>
					),
					[callbacks.show],
				)}

				{useMemo(
					() => (
						<div className="content">
							<SpinningLogo />
						</div>
					),
					[],
				)}
			</div>
			{useMemo(
				() => (
					<SideBarMenu display={displayMenu} onHide={callbacks.hide} renderContent={callbacks.renderMenu} />
				),
				[callbacks, displayMenu],
			)}
		</div>
	);
}

export default styled(App)`
	display: grid;
	height: 100vh;

	.wrapper {
		grid-area: 1/1;
		display: flex;
		flex-direction: column;
		height: 100%;

		.title-bar {
			flex: 0 0 auto;
			background-color: var(--primary-color);
			color: var(--text-on-primary);
			display: grid;
			grid-template-columns: auto 1fr;
			column-gap: 1ch;
			align-items: center;

			.title-container {
				font-size: 3em;
			}
		}

		.content {
			flex: 1 1 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}

	${SideBarMenu} {
		grid-area: 1/1;

		.menu-entry {
			width: 100%;
			padding: var(--spacing-medium);
			text-align: left;
		}
	}
`;
