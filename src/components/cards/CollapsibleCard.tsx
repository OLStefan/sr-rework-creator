import React, { useCallback, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import Card from './Card';
import Button from '../atoms/Button';

const computedStyle = getComputedStyle(document.documentElement);

// Used in styling
// eslint-disable-next-line no-unused-vars
function ExpandIconUnstyled({ expanded = false, ...otherProps }) {
	return <div {...otherProps}>❯</div>;
}

const ExpandIcon = styled(ExpandIconUnstyled)`
	width: var(--card-expand-font-size);
	transform: rotate(${({ expanded }) => (expanded ? '90' : '0')}deg);
	transition-property: all;
	transition-duration: var(--long-animation-duration);
	color: var(--primary-color);
	/* Needed for font offset on top*/
	padding-bottom: 6px;
`;

type CardProps = {
	title: string;
	children: any;
	expanded?: boolean;
	error?: string;
	hint?: string;
	onExpandClick: () => void;
};
function CollapsibleCard({
	title,
	children,
	expanded = false,
	error,
	hint,
	onExpandClick = () => null,
	...otherProps
}: CardProps) {
	const first = useRef<boolean>(true);
	const content = useRef<any>();

	useLayoutEffect(() => {
		if (content.current) {
			const duration = first.current ? 0 : parseFloat(computedStyle.getPropertyValue('--long-animation-duration'));
			first.current = false;

			content.current.style.maxHeight = '';
			const height = `${content.current.getBoundingClientRect().height}px`;
			if (expanded) {
				content.current.style.maxHeight = '';
				content.current.animate({ maxHeight: ['0', height] }, { duration, easing: 'ease-in-out' });
			} else {
				content.current.style.maxHeight = '0';
				content.current.animate({ maxHeight: [height, '0'] }, { duration, easing: 'ease-in-out' });
			}
		}
	}, [expanded]);

	const renderTitle = useCallback(() => {
		return (
			<Button className="titlebar" onClick={onExpandClick}>
				<ExpandIcon expanded={expanded} />
				<span className="title">{title}</span>
				<div className="filler" />
				{error && (
					<div className="error" title={error}>
						!
					</div>
				)}
				{!error && hint && (
					<div className="hint" title={hint}>
						!
					</div>
				)}
			</Button>
		);
	}, [error, expanded, hint, onExpandClick, title]);

	return (
		<Card renderTitle={renderTitle} ref={content} {...otherProps}>
			{children}
		</Card>
	);
}

const CollapsibleCardMemo = React.memo(CollapsibleCard);

export default styled(CollapsibleCardMemo)`
	& > .titlebar {
		width: 100%;
		font-size: var(--card-title-font-size);
		background: none;
		display: flex;
		justify-content: flex-start;
		align-items: center;

		& > .title {
			color: var(--primary-color);
			margin-left: var(--spacing-medium);
		}

		& > .filler {
			flex: 1 0 0;
		}

		& > .error {
			width: 1.2em;
			background-color: var(--error-color);
			border-radius: 50%;
		}

		& > .hint {
			width: 1.2em;
			background-color: var(--hint-color);
			border-radius: 50%;
		}
	}

	& > .content {
		flex: 1 0 auto;
		vertical-align: top;
		overflow: hidden;

		& > .empty {
			padding-top: var(--spacing-large);
		}
	}
`;
