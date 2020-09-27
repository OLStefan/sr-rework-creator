import { noop } from 'lodash';
import React, { HTMLProps, useRef } from 'react';
import styled from 'styled-components';

const ON_CHANGE_DELAY = 0; //ms

const TextField = React.forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>(function (
	{ onChange, onWheel = noop, ...otherProps },
	ref,
) {
	const timeoutId = useRef(0);

	return (
		<input
			ref={ref}
			onWheel={onWheel}
			onChange={
				onChange &&
				((event: React.ChangeEvent<HTMLInputElement>) => {
					event.persist();
					console.log(event.target.value);
					if (timeoutId.current) {
						clearTimeout(timeoutId.current);
					}
					timeoutId.current = setTimeout(() => {
						console.log(event.target.value);

						// onChange(event);
					}, ON_CHANGE_DELAY);
				})
			}
			{...otherProps}
		/>
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
