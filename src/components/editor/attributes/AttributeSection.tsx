import { TFunction } from 'i18next';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { useLabels } from '../../../hooks';
import characterActions from '../../../redux/editor/character/characterActions';
import { useCharacterAttributes } from '../../../redux/selectors';
import { AttributeName } from '../../../types';
import { BaseProps } from '../../../types/props';
import Button from '../../generic/atoms/Button';
import TextField from '../../generic/atoms/TextField';
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

	return (
		<div {...otherProps} data-component="attribute-section">
			{attributes && (
				<div className="attribute-container">
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
			)}
		</div>
	);
}

const AttributeSectionMemo = React.memo(AttributeSection);

export default styled(AttributeSectionMemo)`
	display: flex;
	flex-wrap: wrap-reverse;
	justify-content: center;

	.attribute-container {
		flex: 1 0 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-top: calc(-1 * var(--spacing-small));

		.attribute {
			display: grid;
			grid-template-columns: 1fr 5ch 2em 5ch 2em;
			grid-gap: var(--spacing-medium);
			align-items: center;
			margin-top: var(--spacing-small);

			&:last-child {
				margin-bottom: var(--spacing-small);
			}

			.title {
				font-size: 1.25em;
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
				font-size: 1.25em;
			}
		}
	}
`;
