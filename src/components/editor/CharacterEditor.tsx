import React, { useMemo, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { DEFAULT_TIMEOUT, DRAG_MOVE_THRESHOLD } from '../../constants';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { SectionType } from '../../types';
import SectionContent from './SectionContent';

interface ItemType {
	id: number;
	name: SectionType;
}

const computedStyle = getComputedStyle(document.documentElement);

const initialList = Object.values(SectionType).map((section, index) => ({ name: section, id: index }));

function CharacterEditor({ ...otherProps }: BaseProps) {
	const [list, setList] = useState<ItemType[]>(initialList);

	const { width: windowWidth } = useWindowDimensions();
	const minCardSize = parseFloat(computedStyle.getPropertyValue('--character-editor-card-max-width'));
	const cardsPerRow = Math.floor(windowWidth / minCardSize);

	const callbacks = useUpdatingCallbacks({
		updateListOrder(newList: ItemType[]) {
			if (!list.every((item, index) => newList[index]?.id === item.id)) {
				setList(newList);
			}
		},
	});

	return (
		<div
			{...otherProps}
			style={{ '--cardMinWidth': cardsPerRow ? `${100 / cardsPerRow}%` : cardsPerRow } as React.CSSProperties}
			data-component="character-editor">
			{useMemo(
				() => (
					<ReactSortable
						list={list}
						setList={callbacks.updateListOrder}
						className="list"
						handle=".titlebar"
						delay={DEFAULT_TIMEOUT}
						touchStartThreshold={DRAG_MOVE_THRESHOLD}
						forceFallback>
						{list.map((sectionItem) => (
							<SectionContent key={sectionItem.id} name={sectionItem.name} className="section-content" />
						))}
					</ReactSortable>
				),
				[callbacks.updateListOrder, list],
			)}
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

		.section-content {
			flex: 0 1 var(--character-editor-card-max-width);
			min-width: var(--cardMinWidth);
		}
	}
`;
