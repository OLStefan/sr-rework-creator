import React from 'react';
import styled, { css } from 'styled-components';

type props = {
	children: React.ReactNode;
	onClick: (event: React.MouseEvent) => void;
	disabled?: boolean;
	className?: string;
};
const Button = function ({ children, ...otherProps }: props) {
	return (
		<button type="button" {...otherProps}>
			{children}
		</button>
	);
};

export default styled(Button)`
	font-size: 100%;
	font-family: inherit;
	border: none;
	border-radius: var(--border-radius);
	padding: 0;
	background-color: var(--primary-color);
	color: var(--text-on-primary);

	&:focus {
		outline: var(--button-outline);
		outline-offset: var(--button-outline-offset);
		outline: none;
	}

	${({ disabled }) =>
		disabled
			? css`
					color: var(--text-disabled);
					background-color: var(--primary-color-shade);
			  `
			: css`
					&:hover {
						background-color: var(--primary-color-tint);
					}
			  `}
`;
