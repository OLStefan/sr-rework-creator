import React from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';

interface Props {
	onClick: (event: React.MouseEvent) => void;
}
function BurgerMenuButton({ onClick, ...otherProps }: Props) {
	return (
		<Button className="burger-button" onClick={onClick} {...otherProps}>
			<div className="bar top" />
			<div className="bar middle" />
			<div className="bar bottom" />
		</Button>
	);
}

export default styled(BurgerMenuButton)`
	width: 2ch;
	height: 100%;
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
`;
