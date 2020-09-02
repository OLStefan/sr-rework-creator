import React from 'react';
import styled from 'styled-components';

function BurgerMenuButton({ onClick, ...otherProps }) {
	return (
		<button type="button" className="burger-button" {...{ onClick }} {...otherProps}>
			<div className="bar top" />
			<div className="bar middle" />
			<div className="bar bottom" />
		</button>
	);
}

export default styled(BurgerMenuButton)`
	width: 5ch;
	height: 100%;
	padding: 30% var(--spacing-small);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;

	.bar {
		flex: 0 0 auto;
		height: 15%;
		width: 100%;
		background: var(--text-on-primary);
		border-radius: var(--spacing-small);
	}
`;
