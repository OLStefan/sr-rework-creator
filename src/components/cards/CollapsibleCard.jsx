import React, { useCallback, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import Card from './Card';

const computedStyle = getComputedStyle(document.documentElement);

// Used in styling
// eslint-disable-next-line no-unused-vars
function ExpandIconUnstyled({ expanded = false, ...otherProps }) {
	return <div {...otherProps}>❯</div>;
}

const ExpandIcon = styled(ExpandIconUnstyled)`
	padding: 0;
	border: none;
	background: none;
	user-select: none;
	width: 1em;
	display: flex;
	transform: rotate(${(props) => (props.expanded ? '90' : '0')}deg);
	transition-property: all;
	transition-duration: 0.3s;
	color: var(--primary-color);
	/* Neded for font offset on top */
	padding-bottom: 6px;
`;

function CollapsibleCard({ title, children, expanded = false, onExpandClick = () => null, ...otherProps }) {
	const first = useRef(true);
	const content = useRef();

	useLayoutEffect(() => {
		const duration = first.current ? 0 : parseFloat(computedStyle.getPropertyValue('--long-animation-duration'));
		first.current = false;

		content.current.style.maxHeight = null;
		const height = `${content.current.getBoundingClientRect().height}px`;
		if (expanded) {
			content.current.style.maxHeight = null;
			content.current.animate({ maxHeight: ['0', height] }, { duration, easing: 'ease-in-out' });
		} else {
			content.current.style.maxHeight = '0';
			content.current.animate({ maxHeight: [height, '0'] }, { duration, easing: 'ease-in-out' });
		}
	}, [expanded]);

	const renderTitle = useCallback(() => {
		return (
			<button type="button" className="titlebar" onClick={onExpandClick}>
				<ExpandIcon expanded={expanded} />
				<span className="title">{title}</span>
			</button>
		);
	}, [expanded, onExpandClick, title]);

	return (
		<Card renderTitle={renderTitle} contentRef={content} {...otherProps}>
			{children}
		</Card>
	);
}

const CollapsibleCardMemo = React.memo(CollapsibleCard);

export default styled(CollapsibleCardMemo)`
	display: block;
	flex-direction: column;
	position: relative;
	padding: var(--spacing-medium);

	& > .titlebar {
		width: 100%;
		font-size: 2em;
		background: none;
		display: flex;
		justify-content: flex-start;
		align-items: center;

		& > .title {
			color: var(--primary-color);
			margin-left: var(--spacing-medium);
		}
	}

	& > .content {
		flex: 1 0 auto;
		vertical-align: top;
		overflow: hidden;

		& > .empty {
			padding: var(--spacing-large) 0 0 0;
		}
	}
`;
