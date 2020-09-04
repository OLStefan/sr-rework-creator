import React from 'react';
import styled from 'styled-components';

const CardUnstyled = React.forwardRef(function Card({ title, children, renderTitle, contentRef, ...otherProps }, ref) {
	return (
		<div ref={ref} {...otherProps}>
			{renderTitle ? renderTitle() : <span className="title">{title}</span>}
			<div className="content" ref={contentRef}>
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
			padding: var(--spacing-large) 0 0 0;
		}
	}
`;
