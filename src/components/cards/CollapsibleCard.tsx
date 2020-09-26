import { motion } from 'framer-motion';
import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
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
	const contentRef = useRef<HTMLDivElement>(null);
	const [realHeight, setRealHeight] = useState(0);

	useLayoutEffect(() => {
		if (contentRef.current) {
			const height = contentRef.current.getBoundingClientRect().height;
			setRealHeight(height);
		}
	}, []);

	return (
		<div {...otherProps} data-component="card">
			{useMemo(
				() => (
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
				),
				[error, hint, onExpandClick, title],
			)}
			<motion.div
				initial={{ height: 0 }}
				animate={{ height: expanded ? realHeight : 0 }}
				transition={{ duration: parseFloat(computedStyle.getPropertyValue('--long-animation-duration')) / 1000 }}
				className="content">
				<div className="content-container" ref={contentRef}>
					<div className="empty" />
					{children}
				</div>
			</motion.div>
		</div>
	);
}

const CollapsibleCardMemo = React.memo(CollapsibleCard);

export default styled(CollapsibleCardMemo)`
	position: relative;
	background: var(--background);
	padding: var(--spacing-medium);
	border-radius: var(--border-radius);
	box-shadow: var(--card-shadow);

	.content {
		flex: 1 0 auto;
		vertical-align: top;
		overflow: hidden;
		height: 100%;

		.empty {
			padding-top: var(--spacing-medium);
		}
	}

	.titlebar {
		width: 100%;
		font-size: var(--card-title-font-size);
		background: none;
		display: flex;
		justify-content: flex-start;
		align-items: center;

		.expand {
			width: var(--card-expand-font-size);
			transform: rotate(${({ expanded }) => (expanded ? '90' : '0')}deg);
			transition-property: all;
			transition-duration: var(--long-animation-duration);
			color: var(--primary-color);
			/* Needed for font offset on top*/
			padding-bottom: 6px;
		}

		.title {
			flex: 1 1 auto;
			color: var(--primary-color);
			margin-left: var(--spacing-medium);
			font-size: var(--card-title-font-size);
			display: flex;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.error,
		.hint {
			white-space: pre-line;
		}

		.error {
			width: 1.2em;
			background-color: var(--error-color);
			border-radius: 50%;
		}

		.hint {
			width: 1.2em;
			background-color: var(--hint-color);
			border-radius: 50%;
		}
	}
`;
