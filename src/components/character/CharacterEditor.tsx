import React from 'react';
import styled from 'styled-components';
import { SectionName } from '../../constants';
import SectionContent from './SectionContent';

function CharacterEditor({ ...otherProps }) {
	return (
		<div {...otherProps} data-component="character-editor">
			{Object.values(SectionName).map((sectionName) => (
				<SectionContent key={sectionName} name={sectionName} />
			))}
		</div>
	);
}

export default styled(CharacterEditor)`
	max-height: 100%;
	flex: 1 0 0;
	display: flex;
	flex-wrap: wrap;
	align-content: flex-start;
	overflow-y: auto;

	${SectionContent} {
		flex: 1 0 var(--character-editor-card-small-width);
		max-width: var(--character-editor-card-wide-width);
	}
`;
