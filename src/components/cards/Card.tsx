import React, { useMemo } from 'react';
import styled from 'styled-components';

interface Props {
	renderTitle: () => React.ReactNode;
	children: React.ReactNode;
}
const CardUnstyled = React.forwardRef<HTMLDivElement, Props>(({ renderTitle, children, ...otherProps }, ref) => {
	return (
		<div {...otherProps}>
			{useMemo(() => renderTitle(), [renderTitle])}
			<div className="content" ref={ref}>
				<div className="empty" />
				{children}
			</div>
		</div>
	);
});

export default styled(CardUnstyled)`
	position: relative;
	background: var(--background);
	padding: var(--spacing-medium);
	border-radius: var(--border-radius);
	box-shadow: var(--card-shadow);

	& > .title {
		font-size: var(--card-title-font-size);
		background: none;
		border: none;
		user-select: none;
		width: 100%;
		text-align: left;
		padding: 0;
		display: flex;
		margin-left: var(--spacing-small);
	}

	& > .content {
		flex: 1 0 auto;
		vertical-align: top;
		overflow: hidden;
		height: 100%;

		.empty {
			padding-top: var(--spacing-large);
		}
	}
`;
