import React, { HTMLProps, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { DEFAULT_TIMEOUT } from '../../../constants';

type Props = Omit<HTMLProps<HTMLInputElement>, 'ref'> & {
	timeout?: number;
	limitValue?: (newValue: string) => string;
};
const TextField = React.forwardRef<HTMLInputElement, Props>(function (
	{ onChange, onBlur, value, timeout = DEFAULT_TIMEOUT, limitValue = (value: string) => value, ...otherProps },
	ref,
) {
	const updateId = useRef<number>(0);
	const [currentValue, setCurrentValue] = useState(value);
	const callbacks = useUpdatingCallbacks({
		onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
			event.persist();
			if (onChange) {
				if (updateId.current) {
					clearTimeout(updateId.current);
				}

				event.target.value = limitValue(event.target.value);

				updateId.current = setTimeout(() => {
					onChange(event);
					updateId.current = 0;
				}, timeout);
				setCurrentValue(event.target.value);
			}
		},
		onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
			event.persist();
			event.target.value = limitValue(event.target.value);
			if (onChange && updateId.current) {
				clearTimeout(updateId.current);
				onChange(event);
			}
			if (onBlur) {
				onBlur(event);
			}
		},
	});

	useLayoutEffect(() => {
		setCurrentValue(value);
	}, [value]);

	return (
		<input ref={ref} onChange={callbacks.onChange} onBlur={callbacks.onBlur} value={currentValue} {...otherProps} />
	);
});

export default styled(TextField)`
	height: var(--textfield-default-size);

	&[type='number'] {
		text-align: center;
		-moz-appearance: textfield;

		&::-webkit-inner-spin-button,
		&::-webkit-outer-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
	}
`;
