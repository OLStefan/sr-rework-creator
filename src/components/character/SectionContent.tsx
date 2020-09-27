import { TFunction } from 'i18next';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { SectionName } from '../../constants';
import { useLabels } from '../../hooks';
import { toggleCard } from '../../redux/editor/editorActions';
import { useErrorMessage, useExpandedCard, useHintMessage } from '../../redux/selectors';
import CollapsibleCard from '../molecules/CollapsibleCard';
import AttributeSection from './AttributeSection';

interface Props {
	name: SectionName;
	className?: string;
}
const CardContent = React.memo(function Content({ name, ...otherProps }: Props) {
	return useMemo(() => {
		switch (name) {
			case SectionName.attributes:
				return (
					<div data-component="card-content">
						<AttributeSection {...otherProps} />
					</div>
				);
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
		[name]: () => dispatch(toggleCard(name)),
	});

	return (
		<div {...otherProps} data-component="section-content">
			<CollapsibleCard
				error={errorMessage}
				hint={hintMessage}
				expanded={expanded}
				onExpandClick={callbacks[name]}
				title={labels[name]}>
				<CardContent {...{ name }} />
			</CollapsibleCard>
		</div>
	);
}

const SectionContentMemo = React.memo(SectionContent);

export default styled(SectionContentMemo)`
	padding: var(--spacing-medium);
`;
