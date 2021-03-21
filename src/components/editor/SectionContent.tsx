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
		renderTitleError() {
			return (
				<>
					{hintMessage && (
						<div className="hint round" title={hintMessage}>
							!
						</div>
					)}
					{errorMessage && (
						<div className="error round" title={errorMessage}>
							!
						</div>
					)}
				</>
			);
		},
	});

	return (
		<div {...otherProps} data-component="section-content">
			<CollapsibleCard
				expanded={expanded}
				onExpandClick={callbacks.expandCard}
				title={labels.title}
				data-error={!!errorMessage}
				className="card"
				renderAdditionalTitle={() => (
					<>
						{hintMessage && (
							<div className="hint round" title={hintMessage}>
								!
							</div>
						)}
						{errorMessage && (
							<div className="error round" title={errorMessage}>
								!
							</div>
						)}
					</>
				)}>
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

	.card {
		&[data-error='true'] {
			box-shadow: var(--card-shadow-error);
		}

		.round {
			border-radius: 50%;
			aspect-ratio: 1/1;
			height: 100%;
		}

		.error {
			margin-left: var(--spacing-medium);
			background-color: var(--error-color);
		}

		.hint {
			background-color: var(--hint-color);
		}
	}
`;
