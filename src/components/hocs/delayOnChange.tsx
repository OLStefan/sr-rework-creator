import React, { HTMLProps, useLayoutEffect, useRef, useState } from 'react';
import { useUpdatingCallbacks } from 'use-updating-callbacks';

const DEFAULT_TIMEOUT = 200; //ms

export function withDelayedOnChange<T extends HTMLInputElement | HTMLTextAreaElement>(
	Component: React.ComponentType<HTMLProps<T>>,
	timeout = DEFAULT_TIMEOUT,
) {
	return React.forwardRef<T, HTMLProps<T>>(function ({ onChange, onBlur, value, ...otherProps }, ref) {
		const updateId = useRef<number>(0);
		const [currentValue, setCurrentValue] = useState(value);

		const callbacks = useUpdatingCallbacks({
			onChange: (event: React.ChangeEvent<T>) => {
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
			onBlur: (event: React.FocusEvent<T>) => {
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

		useLayoutEffect(() => {
			setCurrentValue(value);
		}, [value]);

		return (
			<Component
				ref={ref}
				{...otherProps}
				onChange={callbacks.onChange}
				onBlur={callbacks.onBlur}
				value={currentValue}
			/>
		);
	});
}
