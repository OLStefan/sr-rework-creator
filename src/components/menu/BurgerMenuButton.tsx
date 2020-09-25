import React from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';

interface Props {
	onClick: React.MouseEventHandler;
}
function BurgerMenuButton({ onClick, ...otherProps }: Props) {
	return (
		<div {...otherProps}>
			<div className="filler" />
			<Button className="burger-button" onClick={onClick}>
				<div className="bar top" />
				<div className="bar middle" />
				<div className="bar bottom" />
			</Button>
		</div>
	);
}

export default styled(BurgerMenuButton)`
	width: var(--burger-button-size);
	display: grid;

	.filler {
		grid-area: 1/1;
		padding-top: 100%;
	}

	.burger-button {
		grid-area: 1/1;
		padding: var(--spacing-small) var(--spacing-medium);
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;

		.bar {
			flex: 0 0 12.5%;
			width: 100%;
			background: var(--text-on-primary);
			border-radius: var(--border-radius);
		}
	}
`;
