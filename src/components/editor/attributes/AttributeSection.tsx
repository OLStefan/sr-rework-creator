import { TFunction } from 'i18next';
import React from 'react';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { useLabels } from '../../../hooks';
import characterActions from '../../../redux/editor/character/characterActions';
import { useCharacterAttributes } from '../../../redux/selectors';
import { AttributeName, BaseProps } from '../../../types';
import { useDispatch } from '../../../utils/store';
import Button from '../../atoms/Button';
import TextField from '../../atoms/TextField';
import Attribute from './Attribute';

function AttributeSection({ ...otherProps }: BaseProps) {
	const dispatch = useDispatch();
	const attributes = useCharacterAttributes();
	const callbacks = useUpdatingCallbacks({
		onIncreaseAttribute(attributeName: AttributeName) {
			dispatch(characterActions.changeAttribute(attributeName, 1));
		},
		onDecreaseAttribute(attributeName: AttributeName) {
			dispatch(characterActions.changeAttribute(attributeName, -1));
		},
		onChangeAttribute(attributeName: AttributeName, newRating: number) {
			dispatch(characterActions.changeAttribute(attributeName, newRating));
		},
	});

	const { labels } = useLabels((t: TFunction) => ({
		...(Object.fromEntries(Object.values(AttributeName).map((attr) => [attr, t(attr)])) as {
			[x in AttributeName]: string;
		}),
	}));

	if (!attributes) {
		return null;
	}

	return (
		<div {...otherProps} data-component="attribute-section">
			{Object.values(AttributeName).map((attributeName) => (
				<Attribute
					key={attributeName}
					className="attribute"
					title={labels[attributeName]}
					attribute={attributes[attributeName]}
					onChangeAttribute={callbacks.onChangeAttribute}
					onIncreaseAttribute={callbacks.onIncreaseAttribute}
					onDecreaseAttribute={callbacks.onDecreaseAttribute}
				/>
			))}
		</div>
	);
}

export default styled(React.memo(AttributeSection))`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 5ch 2em 5ch 2em;
	grid-gap: var(--spacing-medium);
	justify-content: stretch;
	margin-top: calc(-1 * var(--spacing-small));

	.attribute {
		display: contents;

		.title {
			font-size: var(--card-content-text-size);
		}

		.limit {
			text-align: center;
		}

		${Button} {
			font-size: 1.5em;
			font-weight: var(--font-weight-bold);
			border-radius: 50%;
			display: grid;
			place-items: center;

			.filler,
			.plus,
			.minus {
				grid-area: 1/1;
			}

			.filler {
				padding-top: 100%;
			}
		}

		${TextField} {
			font-size: var(--card-content-text-size);
		}
	}
`;
