import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
	ARMOR,
	ATTRIBUTES,
	CONTACTS,
	DETAILS,
	DRONES,
	GEAR,
	LIFESTYLES,
	QUALITIES,
	SKILLS,
	SPELLS,
	VEHICLES,
	WEAPONS,
} from '../../constants';
import { useLabels, useStableCallbacks } from '../../hooks';
import { toggleCard } from '../../redux/ui/uiActions';
import { useExpandedCards } from '../../selectors';
import CollapsibleCard from '../cards/CollapsibleCard';

function CharacterEditor({ ...otherProps }) {
	const dispatch = useDispatch();
	const expandedCards = useExpandedCards();

	const { labels } = useLabels((t) => ({
		[ATTRIBUTES]: t(ATTRIBUTES),
		[SKILLS]: t(SKILLS),
		[GEAR]: t(GEAR),
		[DETAILS]: t(DETAILS),
		[SPELLS]: t(SPELLS),
		[WEAPONS]: t(WEAPONS),
		[ARMOR]: t(ARMOR),
		[DRONES]: t(DRONES),
		[VEHICLES]: t(VEHICLES),
		[LIFESTYLES]: t(LIFESTYLES),
		[CONTACTS]: t(CONTACTS),
		[QUALITIES]: t(QUALITIES),
	}));

	const callbacks = useStableCallbacks({
		[ATTRIBUTES]: () => dispatch(toggleCard(ATTRIBUTES)),
		[SKILLS]: () => dispatch(toggleCard(SKILLS)),
		[GEAR]: () => dispatch(toggleCard(GEAR)),
		[DETAILS]: () => dispatch(toggleCard(DETAILS)),
		[SPELLS]: () => dispatch(toggleCard(SPELLS)),
		[WEAPONS]: () => dispatch(toggleCard(WEAPONS)),
		[ARMOR]: () => dispatch(toggleCard(ARMOR)),
		[DRONES]: () => dispatch(toggleCard(DRONES)),
		[VEHICLES]: () => dispatch(toggleCard(VEHICLES)),
		[LIFESTYLES]: () => dispatch(toggleCard(LIFESTYLES)),
		[CONTACTS]: () => dispatch(toggleCard(CONTACTS)),
		[QUALITIES]: () => dispatch(toggleCard(QUALITIES)),
	});

	return (
		<div {...otherProps}>
			<div className="card-container">
				<CollapsibleCard expanded={expandedCards[DETAILS]} onExpandClick={callbacks[DETAILS]} title={labels[DETAILS]}>
					{useMemo(
						() => (
							<span>Some text</span>
						),
						[],
					)}
				</CollapsibleCard>
			</div>
			<div className="card-container">
				<CollapsibleCard
					expanded={expandedCards[ATTRIBUTES]}
					onExpandClick={callbacks[ATTRIBUTES]}
					title={labels[ATTRIBUTES]}>
					{useMemo(
						() => (
							<span>Some text</span>
						),
						[],
					)}
				</CollapsibleCard>
			</div>
			<div className="card-container">
				<CollapsibleCard expanded={expandedCards[SKILLS]} onExpandClick={callbacks[SKILLS]} title={labels[SKILLS]}>
					{useMemo(
						() => (
							<span>Some text</span>
						),
						[],
					)}
				</CollapsibleCard>
			</div>
			<div className="card-container">
				<CollapsibleCard expanded={expandedCards[GEAR]} onExpandClick={callbacks[GEAR]} title={labels[GEAR]}>
					{useMemo(
						() => (
							<span>Some text</span>
						),
						[],
					)}
				</CollapsibleCard>
			</div>
			<div className="card-container">
				<CollapsibleCard
					expanded={expandedCards[CONTACTS]}
					onExpandClick={callbacks[CONTACTS]}
					title={labels[CONTACTS]}>
					{useMemo(
						() => (
							<span>Some text</span>
						),
						[],
					)}
				</CollapsibleCard>
			</div>
		</div>
	);
}

export default styled(CharacterEditor)`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	overflow: auto;
	height: 100%;
	align-content: flex-start;

	& > .card-container {
		min-width: var(--character-editor-crad-min-width);
		max-width: var(--character-editor-crad-max-width);
		flex: 1 1 0;
		padding: var(--spacing-medium);
	}
`;
