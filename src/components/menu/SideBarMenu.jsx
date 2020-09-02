import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ESCAPE_KEY } from '../../constants';

// Used in styling
// eslint-disable-next-line no-unused-vars
function SideBarMenu({ display, renderContent, onHide, ...otherProps }) {
	const ref = useRef();

	useEffect(() => {
		if (display) {
			ref.current.focus();
		}
	}, [display]);

	const onKeyDown = (event) => {
		if (event.key === ESCAPE_KEY) {
			onHide();
		}
	};

	return (
		<div {...otherProps} tabIndex={-1}>
			<div className="menu" ref={ref} tabIndex={-1} onBlur={onHide} {...{ onKeyDown }}>
				<div className="button-container">
					<button className="close-button" type="button" onClick={onHide}>
						X
					</button>
				</div>
				<div className="content">{renderContent && renderContent()}</div>
			</div>
		</div>
	);
}

export default styled(SideBarMenu)`
	width: 100vw;
	height: 100vh;
	z-index: 1000000;
	background-color: rgba(0, 0, 0, 0.5);

	${({ display }) => !display && 'display: none;'}

	.menu {
		width: 30vw;
		min-width: 15ch;
		height: 100%;
		font-size: 2em;
		background-color: var(--primary-color);
		display: flex;
		flex-direction: column;
		outline: none;

		& > * {
			flex: 0 0 auto;
		}

		.button-container {
			display: flex;
			justify-content: flex-end;

			.close-button {
				padding: 0 var(--spacing-medium);
			}
		}
	}
`;
