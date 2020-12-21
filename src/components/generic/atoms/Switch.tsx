import React from 'react';
import styled, { css } from 'styled-components';
import { BaseProps } from '../../../types/props';

interface Props extends BaseProps {
	checked: boolean;
	onClick: React.MouseEventHandler;
}
// Used in styling
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Switch({ checked, onClick, ...otherProps }: Props) {
	return (
		<div {...otherProps}>
			<div className="filler" />
			<label className="switch-label" onClick={onClick}>
				<div className="switch-handle">
					<div className="filler" />
				</div>
			</label>
		</div>
	);
}

export default styled(Switch)`
	width: 100%;
	display: grid;

	.filler,
	.switch-label {
		grid-area: 1/1;
	}

	.filler {
		padding-top: 50%;
	}

	.switch-label {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;
		width: 100%;
		height: 100%;

		border-radius: 100px;
		position: relative;
		transition: background-color var(--animation-duration);

		${({ checked }) =>
			checked
				? css`
						background-color: var(--primary-color-shade);
				  `
				: css`
						background-color: grey;
				  `}

		.switch-handle {
			position: absolute;
			margin: 0 auto;
			top: 50%;
			left: var(--spacing-small);
			width: 40%;
			border-radius: 50%;
			transition: var(--animation-duration);
			background: var(--text-on-primary);
			box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
			transform: translateY(-50%);

			${({ checked }) =>
				checked &&
				css`
					left: calc(100% - var(--spacing-small));
					transform: translate(-100%, -50%);
				`}

			.filler {
				padding-top: 100%;
			}
		}
	}
`;
