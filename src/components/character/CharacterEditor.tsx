import { noop } from 'lodash';
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
import { useExpandedCards, useCharacter, useErrors } from '../../redux/selectors';
import CollapsibleCard from '../cards/CollapsibleCard';
import AttributeSection from './AttributeSection';

function CharacterEditor({ ...otherProps }) {
	const dispatch = useDispatch();
	const expandedCards = useExpandedCards();
	const character = useCharacter();
	const errors = useErrors();

	const { labels } = useLabels((t: any) => ({
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
			<div className="cards">
				<div className="card-container">
					<CollapsibleCard
						error={errors[DETAILS]}
						hint="Add a name"
						expanded={expandedCards[DETAILS]}
						onExpandClick={callbacks[DETAILS]}
						title={labels[DETAILS]}>
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
						error={errors[ATTRIBUTES]}
						expanded={expandedCards[ATTRIBUTES]}
						onExpandClick={callbacks[ATTRIBUTES]}
						title={labels[ATTRIBUTES]}>
						{useMemo(
							() => (
								<AttributeSection attributes={character.attributes} onChangeAttribute={noop} />
							),
							[character.attributes],
						)}
					</CollapsibleCard>
				</div>
				<div className="card-container">
					<CollapsibleCard
						error={errors[SKILLS]}
						expanded={expandedCards[SKILLS]}
						onExpandClick={callbacks[SKILLS]}
						title={labels[SKILLS]}>
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
						error={errors[GEAR]}
						expanded={expandedCards[GEAR]}
						onExpandClick={callbacks[GEAR]}
						title={labels[GEAR]}>
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
						error={errors[CONTACTS]}
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
			<div className="sidebar">Lorem ipsum dolor sit amet</div>
		</div>
	);
}

export default styled(CharacterEditor)`
	display: flex;
	flex-wrap: wrap;
	height: 100%;
	width: 100%;

	& > .cards {
		flex: 1 1 var(--character-editor-card-min-width);
		display: flex;
		flex-wrap: wrap;
		overflow-y: auto;
		align-content: flex-start;

		& > .card-container {
			max-width: var(--character-editor-card-max-width);
			padding: var(--spacing-medium);
			flex: 1 1 var(--character-editor-card-min-width);
		}
	}

	& > .sidebar {
		min-height: var(--character-editor-sidebar-min-height);
		min-width: var(--character-editor-sidebar-min-width);
		flex: 0 0 20%;
		overflow-y: auto;
	}
`;
