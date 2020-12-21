import { noop } from 'lodash';
import React, { useMemo, useRef } from 'react';
import { Attribute as AttributeType, AttributeName } from '../../../types';
import { BaseProps } from '../../../types/props';
import Button from '../../generic/atoms/Button';
import TextField from '../../generic/atoms/TextField';

interface Props extends BaseProps {
	attribute: AttributeType;
	title: string;
	onChangeAttribute: (attributeName: AttributeName, newRating: number) => void;
	onIncreaseAttribute: (attributeName: AttributeName) => void;
	onDecreaseAttribute: (attributeName: AttributeName) => void;
}

function Attribute({
	attribute,
	title,
	onChangeAttribute,
	onIncreaseAttribute,
	onDecreaseAttribute,
	...otherProps
}: Props) {
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
				ref={ref}
				min={attribute.minRating}
				value={attribute.rating}
				max={attribute.maxRating}
				onFocus={() => ref.current?.select()}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					const value = event?.target?.value;
					const newRating = Number(value);
					if (value && value.trim() !== '' && !Number.isNaN(newRating)) {
						onChangeAttribute(attribute.name, newRating - attribute.rating);
					}
				}}
				onWheel={noop}
				limitValue={(newValue: string) => {
					const newRating = Number(newValue);
					if (newValue && newValue.trim() !== '' && !Number.isNaN(newRating)) {
						return String(Math.min(Math.max(newRating, attribute.minRating), attribute.maxRating));
					}
					return String(attribute.minRating);
				}}
			/>
			<Button disabled={attribute.rating >= attribute.maxRating} onClick={() => onIncreaseAttribute(attribute.name)}>
				<div className="filler" />
				<div className="plus">+</div>
			</Button>
		</div>
	);
}

export default React.memo(Attribute);
