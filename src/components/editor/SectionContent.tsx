import { TFunction } from 'i18next';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { useLabels } from '../../hooks';
import editorActions from '../../redux/editor/editorActions';
import { useErrorMessage, useExpandedCard, useHintMessage } from '../../redux/selectors';
import CollapsibleCard from '../atoms/CollapsibleCard';
import CardContent from './CardContent';

interface Props extends BaseProps {
	name: SectionType;
}

function SectionContent({ name, ...otherProps }: Props) {
	const dispatch = useDispatch();
	const expanded = useExpandedCard(name);

	const errorMessage = useErrorMessage(name);
	const hintMessage = useHintMessage(name);

	const { labels } = useLabels((t: TFunction) => ({
		title: t(name),
	}));

	const callbacks = useUpdatingCallbacks({
		expandCard() {
			dispatch(editorActions.toggleCard(name));
		},
	});

	return (
		<div {...otherProps} data-component="section-content">
			<CollapsibleCard
				error={errorMessage}
				hint={hintMessage}
				expanded={expanded}
				onExpandClick={callbacks.expandCard}
				title={labels.title}>
				{useMemo(
					() => (
						<CardContent name={name} />
					),
					[name],
				)}
			</CollapsibleCard>
		</div>
	);
}

export default styled(React.memo(SectionContent))`
	padding: var(--spacing-medium);
`;
