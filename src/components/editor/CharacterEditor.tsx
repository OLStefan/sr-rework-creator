import React, { useMemo, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import styled from 'styled-components';
import { useUpdatingCallback } from 'use-updating-callbacks';
import { DEFAULT_TIMEOUT, DRAG_MOVE_THRESHOLD } from '../../constants';
import { SectionName } from '../../types';
import { BaseProps } from '../../types/props';
import SectionContent from './SectionContent';

interface ItemType {
	id: number;
	name: SectionName;
}

function sameItems(a: ItemType, b: ItemType) {
	return a.id === b.id;
}

function CharacterEditor({ ...otherProps }: BaseProps) {
	const initialList = useMemo(
		() => Object.values(SectionName).map((section, index) => ({ name: section, id: index })),
		[],
	);
	const [list, setList] = useState<ItemType[]>(initialList);

	const updateListOrder = useUpdatingCallback((newList: ItemType[]) => {
		if (!list.every((item, index) => sameItems(item, newList[index]))) {
			setList(newList);
		}
	});

	return (
		<div {...otherProps} data-component="character-editor">
			<ReactSortable
				list={list}
				setList={updateListOrder}
				className="list"
				handle=".titlebar"
				delay={DEFAULT_TIMEOUT}
				touchStartThreshold={DRAG_MOVE_THRESHOLD}
				forceFallback>
				{list.map((sectionItem) => (
					<SectionContent key={sectionItem.id} name={sectionItem.name} />
				))}
			</ReactSortable>
		</div>
	);
}

export default styled(CharacterEditor)`
	max-height: 100%;
	overflow-y: auto;

	.list {
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;

		${SectionContent} {
			flex: 1 0 var(--character-editor-card-small-width);
			max-width: var(--character-editor-card-wide-width);
		}

		/* calc(3 * var(--character-editor-card-medium-width))*/
		@media only screen and (min-width: 1200px) {
			${SectionContent} {
				min-width: calc(1.5 * var(--character-editor-card-small-width));
				max-width: calc(1.5 * var(--character-editor-card-wide-width));
			}
		}
	}
`;
