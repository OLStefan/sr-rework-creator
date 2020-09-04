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
	display: block;
	flex-direction: column;
	position: relative;
	background: var(--background);
	padding: var(--spacing-medium);
	border-radius: 4px;
	background-clip: padding-box;
	box-shadow: var(--card-shadow);

	& > .title {
		flex: 0 0 auto;
		font-size: 1.5em;
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
