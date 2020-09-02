import React from 'react';
import styled from 'styled-components';
import logo from './logo.svg';
import './default.css';

function App({ ...otherProps }) {
	return (
		<div className="app" {...otherProps}>
			<img src={logo} className="app-logo" alt="logo" />
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

	.app-logo {
		height: 60vmin;
		pointer-events: none;
	}

	@media (prefers-reduced-motion: no-preference) {
		.app-logo {
			animation: app-logo-spin infinite 5s linear;
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
