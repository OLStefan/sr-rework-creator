import { HTMLProps } from 'react';
import styled, { css } from 'styled-components';

function Button({ children, ...otherProps }: Omit<HTMLProps<HTMLButtonElement>, 'type'>) {
	return (
		<button {...otherProps} type="button">
			{children}
		</button>
	);
}

export default styled(Button)`
	font-size: 100%;
	font-family: inherit;
	border: none;
	border-radius: var(--border-radius);
	padding: 0;
	background-color: var(--primary-color);
	color: var(--text-on-primary);

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
