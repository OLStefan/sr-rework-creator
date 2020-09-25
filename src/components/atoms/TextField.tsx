import React, { HTMLProps, useRef } from 'react';
import styled from 'styled-components';

const ON_CHANGE_DELAY = 0; //ms

const TextField = React.forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>(function (
	{ onChange, ...otherProps },
	ref,
) {
	const timeoutId = useRef(0);

	return (
		<input
			ref={ref}
			onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
				if (onChange) {
					event.persist();
					console.log(event.target.value);
					if (timeoutId.current) {
						clearTimeout(timeoutId.current);
					}
					timeoutId.current = setTimeout(() => {
						console.log(event.target.value);

						onChange(event);
					}, ON_CHANGE_DELAY);
				}
			}}
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
