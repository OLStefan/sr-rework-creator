import { motion } from 'framer-motion';
import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useResizeObserver } from '../../hooks';
import Button from './Button';

const computedStyle = getComputedStyle(document.documentElement);

interface Props extends BaseProps {
	title: string;
	onExpandClick: React.MouseEventHandler;
	renderAdditionalTitle?: () => JSX.Element;
	expanded?: boolean;
}
function CollapsibleCard({
	title,
	children,
	expanded,
	onExpandClick,
	renderAdditionalTitle,
	...otherProps
}: React.PropsWithChildren<Props>) {
	const [contentRef, { height }] = useResizeObserver<HTMLDivElement>(['height']);

	// Need to use a ref here, so the content stays visible until the transition ends
	const expandedRef = useRef(!!expanded);
	const [contentHeight, setContentHeight] = useState(0);

	useLayoutEffect(() => {
		const expandedHeight = contentRef.current?.getBoundingClientRect().height ?? 0;
		const newHeight = expanded ? expandedHeight : 0;
		if (newHeight !== contentHeight) {
			expandedRef.current = !!expanded;
			setContentHeight(newHeight);
		}
		// No need to react to the triggered changed of contentHeight
		// Also trigger for resize changes
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [expanded, height]);

	return (
		<div data-component="card" {...otherProps}>
			{useMemo(
				() => (
					<Button className="titlebar" onClick={onExpandClick}>
						<div className="expand">❯</div>
						<span className="title">{title}</span>
						{renderAdditionalTitle && renderAdditionalTitle()}
					</Button>
				),
				[onExpandClick, renderAdditionalTitle, title],
			)}
			<motion.div
				// Needed as per the framer motion docu
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				initial={{ height: contentHeight, '--visibility': 'visible' } as any}
				animate={
					{
						'--visibility': 'visible',
						height: contentHeight,
						transitionEnd: {
							'--visibility': expandedRef.current ? 'visible' : 'hidden',
						},
						// Needed as per the framer motion docu
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
					} as any
				}
				transition={{ duration: parseFloat(computedStyle.getPropertyValue('--long-animation-duration')) / 1000 }}
				className="content">
				<div className="content-container" ref={contentRef}>
					{children}
				</div>
			</motion.div>
		</div>
	);
}

export default styled(React.memo(CollapsibleCard))`
	position: relative;
	background: var(--background);
	border-radius: var(--border-radius);
	box-shadow: var(--card-shadow);

	& > .content {
		overflow: hidden;

		.content-container {
			padding: var(--spacing-medium);
			visibility: var(--visibility);
		}
	}

	.titlebar {
		width: 100%;
		font-size: var(--card-title-font-size);
		background: none;
		display: flex;
		gap: var(--spacing-medium);
		justify-content: flex-start;
		align-items: center;
		padding: var(--spacing-medium);

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
			font-size: var(--card-title-font-size);
			display: flex;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
`;
