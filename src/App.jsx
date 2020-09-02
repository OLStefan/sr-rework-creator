import React from 'react';
import styled from 'styled-components';
import logo from './logo.svg';
import './default.css';

function App({ ...otherProps }) {
	return (
		<div {...otherProps}>
			<img src={logo} className="app-logo" alt="logo" />
			<div className="app-text">Someday there may be something here</div>
		</div>
	);
}

export default styled(App)`
	background-color: #282c34;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	.app-text {
		color: white;
		font-size: 3em;
	}

	.app-logo {
		height: 60vmin;
		pointer-events: none;
	}

	@media (prefers-reduced-motion: no-preference) {
		.app-logo {
			animation: app-logo-spin infinite 30s linear;
		}
	}

	@keyframes app-logo-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`;
