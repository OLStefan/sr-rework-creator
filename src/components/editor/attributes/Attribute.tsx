import { noop } from 'lodash';
import { memo, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { Attribute, AttributeName, BaseProps } from '../../../types';
import Button from '../../atoms/Button';
import TextField from '../../atoms/TextField';

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
		onIncreaseAttribute() {
			onIncreaseAttribute(attribute.name);
		},
		onDecreaseAttribute() {
			onDecreaseAttribute(attribute.name);
		},
	});

	const decreaseDisabled = attribute.rating <= attribute.minRating;
	const increaseDisabled = attribute.rating >= attribute.maxRating;

	return (
		<div {...otherProps}>
			<label className="title">{title}</label>
			{useMemo(
				() => (
					<label className="limit">{`(${attribute.minRating}/${attribute.maxRating})`}</label>
				),
				[attribute.maxRating, attribute.minRating],
			)}
			{useMemo(
				() => (
					<Button disabled={decreaseDisabled} onClick={callbacks.onDecreaseAttribute}>
						<div className="filler" />
						<div className="minus">-</div>
					</Button>
				),
				[callbacks.onDecreaseAttribute, decreaseDisabled],
			)}

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
			{useMemo(
				() => (
					<Button disabled={increaseDisabled} onClick={callbacks.onIncreaseAttribute}>
						<div className="filler" />
						<div className="plus">+</div>
					</Button>
				),
				[callbacks.onIncreaseAttribute, increaseDisabled],
			)}
		</div>
	);
}

export default styled(memo(Attribute))`
	label {
		display: flex;
		align-items: center;

		&.limit {
			justify-content: center;
		}
	}
`;
