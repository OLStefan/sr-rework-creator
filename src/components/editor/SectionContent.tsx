import { TFunction } from 'i18next';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { useLabels } from '../../hooks';
import editorActions from '../../redux/editor/editorActions';
import { useErrorMessage, useExpandedCard, useHintMessage } from '../../redux/selectors';
import { SectionName } from '../../types';
import { BaseProps } from '../../types/props';
import CollapsibleCard from '../generic/molecules/CollapsibleCard';
import AttributeSection from './attributes/AttributeSection';
import DetailsSection from './details/DetailsSection';

interface Props extends BaseProps {
	name: SectionName;
}
const CardContent = React.memo(function Content({ name, ...otherProps }: Props) {
	return useMemo(() => {
		switch (name) {
			case SectionName.ATTRIBUTES:
				return <AttributeSection {...otherProps} />;
			case SectionName.DETAILS:
				return <DetailsSection {...otherProps} />;
			default:
				return <span>Some text</span>;
		}
	}, [name, otherProps]);
});

function SectionContent({ name, ...otherProps }: Props) {
	const dispatch = useDispatch();
	const expanded = useExpandedCard(name);

	const errorMessage = useErrorMessage(name);
	const hintMessage = useHintMessage(name);

	const { labels } = useLabels((t: TFunction) => ({
		[name]: t(name),
	}));

	const callbacks = useUpdatingCallbacks({
		[name]() {
			dispatch(editorActions.toggleCard(name));
		},
	});

	return (
		<div {...otherProps} data-component="section-content">
			<CollapsibleCard
				error={errorMessage}
				hint={hintMessage}
				expanded={expanded}
				// callbacks and labels are created locally with the name attribute existing
				/* eslint-disable @typescript-eslint/no-non-null-assertion */
				onExpandClick={callbacks[name]!}
				title={labels[name]!}
				/* eslint-enable @typescript-eslint/no-non-null-assertion */
			>
				<CardContent name={name} />
			</CollapsibleCard>
		</div>
	);
}

const SectionContentMemo = React.memo(SectionContent);

export default styled(SectionContentMemo)`
	padding: var(--spacing-medium);
`;
