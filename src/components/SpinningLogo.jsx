import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.svg';

function SpinningLogo({ ...otherProps }) {
	return (
		<div {...otherProps}>
			<img src={logo} className="app-logo" alt="logo" />
		</div>
	);
}

export default styled(SpinningLogo)`
	display: contents;

	.app-logo {
		width: 60vmin;
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
