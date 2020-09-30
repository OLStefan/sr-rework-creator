import React, { HTMLProps } from 'react';
import styled from 'styled-components';
import { withDelayedOnChange } from '../hocs/delayOnChange';

const DelayTextField = withDelayedOnChange<HTMLInputElement>((props) => <input {...props} />);

type Props = Omit<HTMLProps<HTMLInputElement>, 'ref'>;
const TextField = React.forwardRef<HTMLInputElement, Props>(function ({ ...otherProps }, ref) {
	return <DelayTextField ref={ref} {...otherProps} />;
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
