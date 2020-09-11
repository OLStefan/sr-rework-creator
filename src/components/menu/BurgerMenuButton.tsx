import React from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';

type Props = { onClick: any };
function BurgerMenuButton({ onClick, ...otherProps }: Props) {
	return (
		<Button className="burger-button" {...{ onClick }} {...otherProps}>
			<div className="bar top" />
			<div className="bar middle" />
			<div className="bar bottom" />
		</Button>
	);
}

export default styled(BurgerMenuButton)`
	width: 2ch;
	height: 1em;
	padding: 0 var(--spacing-medium);
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;

	.bar {
		flex: 0 0 10%;
		width: 100%;
		background: var(--text-on-primary);
		border-radius: var(--spacing-small);
	}
`;
