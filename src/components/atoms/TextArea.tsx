import React, { HTMLProps, useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { DEFAULT_TIMEOUT } from '../../constants';

type Style = Omit<NonNullable<HTMLProps<HTMLTextAreaElement>['style']>, 'maxHeight' | 'minHeight'> & {
	height?: number;
};
interface Props extends Omit<HTMLProps<HTMLTextAreaElement>, 'style' | 'ref'> {
	style?: Style;
	autosize?: boolean;
	timeout?: number;
	maxRows: number;
	minRows: number;
	onHeightChange?: () => void;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>(function (
	{ onChange, onBlur, value, timeout = DEFAULT_TIMEOUT, autosize, ...otherProps },
	ref,
) {
	const updateId = useRef<NodeJS.Timeout>();
	const [overwriteCurrentValue, setOverwriteCurrentValue] = useState(false);
	const [currentValue, setCurrentValue] = useState(value);
	const callbacks = useUpdatingCallbacks({
		onChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
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

	if (autosize) {
		return (
			<TextareaAutosize
				ref={ref}
				onChange={callbacks.onChange}
				onBlur={callbacks.onBlur}
				value={currentValue}
				{...otherProps}
			/>
		);
	}

	return (
		<textarea ref={ref} onChange={callbacks.onChange} onBlur={callbacks.onBlur} value={currentValue} {...otherProps} />
	);
});

export default styled(TextArea)`
	padding: var(--spacing-small);
`;
