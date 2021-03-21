import React, { HTMLProps, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { DEFAULT_TIMEOUT } from '../../constants';

export interface TextFieldProps extends HTMLProps<HTMLInputElement> {
	timeout?: number;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(function (
	{ onChange, onBlur, value, timeout = DEFAULT_TIMEOUT, ...otherProps },
	ref,
) {
	const updateId = useRef<NodeJS.Timeout>();
	const [overwriteCurrentValue, setOverwriteCurrentValue] = useState(false);
	const [currentValue, setCurrentValue] = useState(value);

	const callbacks = useUpdatingCallbacks({
		onChange(event: React.ChangeEvent<HTMLInputElement>) {
			if (onChange) {
				if (updateId.current) {
					clearTimeout(updateId.current);
				}

				updateId.current = setTimeout(() => {
					onChange(event);
					updateId.current = undefined;
					setOverwriteCurrentValue(true);
				}, timeout);
				setCurrentValue(event.target.value);
			}
		},
		onBlur(event: React.FocusEvent<HTMLInputElement>) {
			if (onChange && updateId.current) {
				clearTimeout(updateId.current);
				onChange(event);
			}
			if (onBlur) {
				onBlur(event);
			}
		},
	});

	useEffect(() => {
		setOverwriteCurrentValue(false);
		setCurrentValue(value);
		// always reset the value, if overwriteValue is set
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value, overwriteCurrentValue]);

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
