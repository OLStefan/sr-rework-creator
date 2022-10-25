import { useMemo, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { DEFAULT_TIMEOUT, DRAG_MOVE_THRESHOLD } from '../../constants';
import { BaseProps, SectionType } from '../../types';
import SectionContent from './SectionContent';

interface ItemType {
	id: number;
	name: SectionType;
}

const initialList = Object.values(SectionType).map((section, index) => ({ name: section, id: index }));

function CharacterEditor({ ...otherProps }: BaseProps) {
	const [list, setList] = useState<ItemType[]>(initialList);

	const callbacks = useUpdatingCallbacks({
		updateListOrder(newList: ItemType[]) {
			if (!list.every((item, index) => newList[index]?.id === item.id)) {
				setList(newList);
			}
		},
	});

	return (
		<div {...otherProps} data-component="character-editor">
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
							<SectionContent key={sectionItem.id} name={sectionItem.name} />
						))}
					</ReactSortable>
				),
				[callbacks.updateListOrder, list],
			)}
		</div>
	);
}

export default styled(CharacterEditor)`
	height: 100%;
	overflow-y: auto;

	.list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(var(--character-editor-card-min-width), 1fr));
	}
`;
