import React from 'react';
import styled from 'styled-components';
import { sections } from '../../constants';
import SectionContent from './SectionContent';

function CharacterEditor({ ...otherProps }) {
	return (
		<div {...otherProps}>
			{sections.map((sectionName) => (
				<SectionContent key={sectionName} name={sectionName} />
			))}
		</div>
	);
}

export default styled(CharacterEditor)`
	flex: 1 1 var(--character-editor-card-min-width);
	display: flex;
	flex-wrap: wrap;
	max-height: 100%;
	overflow-y: auto;
	align-content: flex-start;

	& > .card-container {
		max-width: var(--character-editor-card-max-width);
		padding: var(--spacing-medium);
		flex: 1 1 var(--character-editor-card-min-width);
	}
`;
