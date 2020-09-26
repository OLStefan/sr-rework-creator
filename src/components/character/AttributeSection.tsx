import { TFunction } from 'i18next';
import { noop } from 'lodash';
import React, { useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { AttributeName } from '../../constants';
import { useLabels } from '../../hooks';
import { changeAttribute } from '../../redux/character/characterActions';
import { Attribute } from '../../redux/character/types';
import { useCharacterAttributes } from '../../redux/selectors';
import Button from '../atoms/Button';
import TextField from '../atoms/TextField';

interface AttributeProps {
	attribute: Attribute;
	title: string;
	onChangeAttribute: (attributeName: AttributeName, newRating: number) => void;
	onIncreaseAttribute: (attributeName: AttributeName) => void;
	onDecreaseAttribute: (attributeName: AttributeName) => void;
	className?: string;
}
const AttributeComponent = React.memo(function ({
	attribute,
	title,
	onChangeAttribute,
	onIncreaseAttribute,
	onDecreaseAttribute,
	...otherProps
}: AttributeProps) {
	const ref = useRef<HTMLInputElement>(null);

	return (
		<div {...otherProps}>
			<div className="title">{title}</div>
			{useMemo(
				() => (
					<div className="limit">{`(${attribute.minRating}/${attribute.maxRating})`}</div>
				),
				[attribute.maxRating, attribute.minRating],
			)}
			<Button disabled={attribute.rating <= attribute.minRating} onClick={() => onDecreaseAttribute(attribute.name)}>
				<div className="filler" />
				<div className="minus">-</div>
			</Button>
			<TextField
				type="number"
				maxLength={2}
				ref={ref}
				value={attribute.rating}
				onWheel={noop}
				onFocus={() => ref.current?.select()}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					const value = event?.target?.value;
					console.log(value);
					// const newRating = Number(value);
					// if (value && value.trim() !== '' && !Number.isNaN(newRating)) {
					// 	onChangeAttribute(attribute.name, newRating - attribute.rating);
					// }
				}}
			/>
			<Button disabled={attribute.rating >= attribute.maxRating} onClick={() => onIncreaseAttribute(attribute.name)}>
				<div className="filler" />
				<div className="plus">+</div>
			</Button>
		</div>
	);
});

function AttributeSection({ ...otherProps }) {
	const dispatch = useDispatch();
	const attributes = useCharacterAttributes();
	const callbacks = useUpdatingCallbacks({
		onIncreaseAttribute: (attributeName: AttributeName) => dispatch(changeAttribute(attributeName, 1)),
		onDecreaseAttribute: (attributeName: AttributeName) => dispatch(changeAttribute(attributeName, -1)),
		onChangeAttribute: (attributeName: AttributeName, newRating: number) =>
			dispatch(changeAttribute(attributeName, newRating)),
	});

	const { labels } = useLabels((t: TFunction) => ({
		...(function () {
			const attrs: any = {};
			Object.values(AttributeName).forEach((attr) => (attrs[attr] = t(attr)));
			return attrs;
		})(),
	}));

	return (
		<div {...otherProps} data-component="attribute-section">
			{attributes && (
				<div className="attribute-container">
					{Object.values(AttributeName).map((attributeName) => (
						<AttributeComponent
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

export default styled(AttributeSection)`
	display: flex;
	flex-wrap: wrap-reverse;
	justify-content: center;

	.attribute-container {
		flex: 1 0 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin: 0 calc(-1 * var(--spacing-large));

		.attribute {
			display: grid;
			grid-template-columns: 1fr 5ch 2em 5ch 2em;
			grid-gap: var(--spacing-medium);
			align-items: center;
			margin: 0 var(--spacing-large);

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
				font-size: 1.5em;
			}
		}
	}
`;
