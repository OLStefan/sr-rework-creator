import React, { useCallback, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import Card from './Card';
import Button from '../atoms/Button';

const computedStyle = getComputedStyle(document.documentElement);

interface Props {
	title: string;
	children: React.ReactNode;
	onExpandClick: React.MouseEventHandler;
	expanded: boolean;
	error?: string;
	hint?: string;
}
function CollapsibleCard({ title, children, expanded = false, error, hint, onExpandClick, ...otherProps }: Props) {
	const first = useRef<boolean>(true);
	const content = useRef<HTMLDivElement>(null);

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
				<div className="expand">❯</div>
				<span className="title">{title}</span>
				{error && (
					<div data-html="true" className="error" title={error}>
						!
					</div>
				)}
				{!error && hint && (
					<div data-html="true" className="hint" title={hint}>
						!
					</div>
				)}
			</Button>
		);
	}, [error, hint, onExpandClick, title]);

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

		& > .expand {
			width: var(--card-expand-font-size);
			transform: rotate(${({ expanded }) => (expanded ? '90' : '0')}deg);
			transition-property: all;
			transition-duration: var(--long-animation-duration);
			color: var(--primary-color);
			/* Needed for font offset on top*/
			padding-bottom: 6px;
		}

		& > .title {
			flex: 1 1 auto;
			color: var(--primary-color);
			margin-left: var(--spacing-medium);
			text-align: left;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.error,
		.hint {
			white-space: pre-line;
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
