import React, { HTMLProps } from 'react';
import styled from 'styled-components';
import { withDelayedOnChange } from '../hocs/delayOnChange';

const DelayTextArea = withDelayedOnChange<HTMLTextAreaElement>((props) => <textarea {...props} />);

type Props = Omit<HTMLProps<HTMLTextAreaElement>, 'ref'>;
const TextArea = React.forwardRef<HTMLTextAreaElement, Props>(function ({ ...otherProps }, ref) {
	return <DelayTextArea ref={ref} {...otherProps} />;
});

export default styled(TextArea)``;
