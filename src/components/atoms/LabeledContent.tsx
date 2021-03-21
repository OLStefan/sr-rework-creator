import React from 'react';
import styled from 'styled-components';

interface Props extends BaseProps {
	title: string;
}

function LabeledContent({ title, children, ...otherProps }: React.PropsWithChildren<Props>) {
	return (
		<div {...otherProps}>
			<label className="title">{title}</label>
			{children}
		</div>
	);
}

export default styled(LabeledContent)`
	padding: var(--spacing-small);
	display: flex;
	flex-direction: column;

	.title {
		margin-bottom: var(--spacing-small);
	}
`;
