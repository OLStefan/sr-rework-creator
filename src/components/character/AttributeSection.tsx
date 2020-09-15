import { TFunction } from 'i18next';
import React, { useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import {
	attributes as attributeNames,
	ATTRIBUTE_AGILITY,
	ATTRIBUTE_BODY,
	ATTRIBUTE_CHARISMA,
	ATTRIBUTE_INTELLIGENCE,
	ATTRIBUTE_STRENGTH,
	ATTRIBUTE_WILLPOWER,
} from '../../constants';
import { useLabels } from '../../hooks';
import { changeAttribute } from '../../redux/character/characterActions';
import { Attribute } from '../../redux/character/characterReducer';
import { useCharacterAttributes } from '../../redux/selectors';
import Button from '../atoms/Button';

interface AttributeProps {
	attribute: Attribute;
	title: string;
	onChangeAttribute: (attributeName: string, newRating: number) => any;
	onIncreaseAttribute: (attributeName: string) => any;
	onDecreaseAttribute: (attributeName: string) => any;
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
			<input
				type="number"
				maxLength={2}
				value={attribute.rating}
				ref={ref}
				onFocus={() => ref.current?.select()}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					const value = event.currentTarget.value;
					const newRating = Number(value);
					if (value.trim() !== '' && !Number.isNaN(newRating))
						onChangeAttribute(attribute.name, newRating - attribute.rating);
				}}
			/>
			<Button disabled={attribute.rating >= attribute.maxRating} onClick={() => onIncreaseAttribute(attribute.name)}>
				<div className="filler" />
				<div className="plus">+</div>
			</Button>
		</div>
	);
});

interface Props {}
function AttributeSection({ ...otherProps }: Props) {
	const dispatch = useDispatch();
	const attributes = useCharacterAttributes();
	const callbacks = useUpdatingCallbacks({
		onIncreaseAttribute: (attributeName: string) => dispatch(changeAttribute(attributeName, 1)),
		onDecreaseAttribute: (attributeName: string) => dispatch(changeAttribute(attributeName, -1)),
		onChangeAttribute: (attributeName: string, newRating: number) =>
			dispatch(changeAttribute(attributeName, newRating)),
	});

	const { labels } = useLabels((t: TFunction) => ({
		[ATTRIBUTE_STRENGTH]: t(ATTRIBUTE_STRENGTH),
		[ATTRIBUTE_AGILITY]: t(ATTRIBUTE_AGILITY),
		[ATTRIBUTE_BODY]: t(ATTRIBUTE_BODY),
		[ATTRIBUTE_INTELLIGENCE]: t(ATTRIBUTE_INTELLIGENCE),
		[ATTRIBUTE_WILLPOWER]: t(ATTRIBUTE_WILLPOWER),
		[ATTRIBUTE_CHARISMA]: t(ATTRIBUTE_CHARISMA),
	}));

	return (
		<div {...otherProps}>
			{attributes && (
				<div className="attribute-container">
					{attributeNames.map((attributeName: string) => (
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
			<div className="filler" />
		</div>
	);
}

export default styled(AttributeSection)`
	display: flex;

	.filler {
		flex: 0 1 33%;
	}

	.attribute-container {
		flex: 1 0 0;
		display: grid;
		grid-template-columns: 15ch 5ch 2em 5ch 2em;
		grid-gap: var(--spacing-medium);
		align-items: center;

		.attribute {
			display: contents;

			.title {
				font-size: 1.25em;
			}

			input {
				text-align: center;
				-moz-appearance: textfield;

				&::-webkit-outer-spin-button,
				&::-webkit-inner-spin-button {
					-webkit-appearance: none;
					margin: 0;
				}
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

				& > * {
					grid-area: 1/1;
				}

				.filler {
					padding-top: 100%;
				}
			}
		}
	}
`;
