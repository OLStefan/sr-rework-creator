import { TFunction } from 'i18next';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { useLabels } from '../../hooks';
import editorActions from '../../redux/editor/editorActions';
import { useErrorMessage, useExpandedCard, useHintMessage } from '../../redux/selectors';
import CollapsibleCard from '../generic/atoms/CollapsibleCard';
import CardContent from './CardContent';

interface Props extends BaseProps {
	name: SectionName;
}

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

export default styled(React.memo(SectionContent))`
	padding: var(--spacing-medium);
`;
