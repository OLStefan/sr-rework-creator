import React, { HTMLProps, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { DEFAULT_TIMEOUT } from '../../../constants';

interface Props extends HTMLProps<HTMLTextAreaElement> {
	timeout?: number;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>(function (
	{ onChange, onBlur, value, timeout = DEFAULT_TIMEOUT, ...otherProps },
	ref,
) {
	const updateId = useRef<NodeJS.Timeout>();
	const [overwriteCurrentValue, setOverwriteCurrentValue] = useState(false);
	const [currentValue, setCurrentValue] = useState(value);
	const callbacks = useUpdatingCallbacks({
		onChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
			event.persist();
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
		onBlur(event: React.FocusEvent<HTMLTextAreaElement>) {
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

	useEffect(() => {
		setOverwriteCurrentValue(false);
		setCurrentValue(value);
		// always reset the value, if overwriteValue is set
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value, overwriteCurrentValue]);

	return (
		<textarea ref={ref} onChange={callbacks.onChange} onBlur={callbacks.onBlur} value={currentValue} {...otherProps} />
	);
});

export default styled(TextArea)``;
