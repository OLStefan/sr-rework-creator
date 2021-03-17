import { noop } from 'lodash';
import React, { useMemo, useRef } from 'react';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { AttributeName } from '../../../types';
import Button from '../../generic/atoms/Button';
import TextField from '../../generic/atoms/TextField';

interface Props extends BaseProps {
	attribute: Attribute;
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
	const callbacks = useUpdatingCallbacks({
		onChange(event: React.ChangeEvent<HTMLInputElement>) {
			const value = event?.target?.value;
			const newRating = Number(value);
			if (value && value.trim() !== '' && !Number.isNaN(newRating)) {
				onChangeAttribute(attribute.name, newRating - attribute.rating);
			} else {
				onChangeAttribute(attribute.name, attribute.minRating - attribute.rating);
			}
		},
		onFocus() {
			ref.current?.select();
		},
	});

	return (
		<div {...otherProps}>
			<label className="title">{title}</label>
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
				onFocus={callbacks.onFocus}
				onChange={callbacks.onChange}
				timeout={500}
				// onWheel must be set to allow for scrolling to change value
				onWheel={noop}
			/>
			<Button disabled={attribute.rating >= attribute.maxRating} onClick={() => onIncreaseAttribute(attribute.name)}>
				<div className="filler" />
				<div className="plus">+</div>
			</Button>
		</div>
	);
}

export default React.memo(Attribute);
