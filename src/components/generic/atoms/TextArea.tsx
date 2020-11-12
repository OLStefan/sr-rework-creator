import React, { HTMLProps, useRef, useState } from 'react';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { DEFAULT_TIMEOUT } from '../../../constants';

interface Props extends Omit<HTMLProps<HTMLTextAreaElement>, 'ref'> {
	timeout?: number;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>(function (
	{ onChange, onBlur, value, timeout = DEFAULT_TIMEOUT, ...otherProps },
	ref,
) {
	const updateId = useRef<number>(0);
	const [currentValue, setCurrentValue] = useState(value);
	const callbacks = useUpdatingCallbacks({
		onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
			event.persist();
			if (onChange) {
				if (updateId.current) {
					clearTimeout(updateId.current);
				}

				updateId.current = setTimeout(() => {
					onChange(event);
					updateId.current = 0;
				}, timeout);
				setCurrentValue(event.target.value);
			}
		},
		onBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => {
			event.persist();
			if (onChange && updateId.current) {
				clearTimeout(updateId.current);
				onChange(event);
			}
			if (onBlur) {
				onBlur(event);
			}
		},
	});

	return (
		<textarea ref={ref} onChange={callbacks.onChange} onBlur={callbacks.onBlur} value={currentValue} {...otherProps} />
	);
});

export default styled(TextArea)``;
