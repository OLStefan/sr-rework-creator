import React, { HTMLProps, useRef } from 'react';
import styled from 'styled-components';

const ON_CHANGE_DELAY = 200; //ms

const TextArea = React.forwardRef<HTMLTextAreaElement, HTMLProps<HTMLTextAreaElement>>(function (
	{ onChange, ...otherProps },
	ref,
) {
	const timeoutId = useRef(0);

	return (
		<textarea
			ref={ref}
			onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
				if (timeoutId.current) {
					clearTimeout(timeoutId.current);
				}
				if (onChange) {
					timeoutId.current = setTimeout(() => onChange(event), ON_CHANGE_DELAY);
				}
			}}
			{...otherProps}
		/>
	);
});

export default styled(TextArea)``;
