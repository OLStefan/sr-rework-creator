import React from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';

interface Props extends BaseProps {
	onClick: React.MouseEventHandler;
}
function BurgerMenuButton({ onClick, ...otherProps }: Props) {
	return (
		<Button {...otherProps} onClick={onClick} data-component="burger-button">
			<div className="bar top" />
			<div className="bar middle" />
			<div className="bar bottom" />
		</Button>
	);
}

export default styled(BurgerMenuButton)`
	padding: var(--spacing-small);
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
