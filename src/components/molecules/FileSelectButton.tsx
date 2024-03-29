import { useRef } from 'react';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { BaseProps } from '../../types';
import Button from '../atoms/Button';

interface Props extends BaseProps {
	onFileSelect: (file: File) => void;
	acceptedFiles: string;
	multiple: boolean;
}
function FileSelectButton({
	onFileSelect,
	acceptedFiles,
	multiple,
	children,
	...otherProps
}: React.PropsWithChildren<Props>) {
	const inputRef = useRef<HTMLInputElement>(null);

	const callbacks = useUpdatingCallbacks({
		onClick() {
			inputRef.current?.click();
		},
		onChange(event: React.ChangeEvent<HTMLInputElement>) {
			const file = event.target.files && event.target.files[0];
			if (!file) {
				return;
			}
			onFileSelect(file);
		},
	});

	return (
		<Button onClick={callbacks.onClick} {...otherProps}>
			<input
				type="file"
				className="input"
				ref={inputRef}
				onChange={callbacks.onChange}
				accept={acceptedFiles}
				multiple={multiple}
			/>
			{children}
		</Button>
	);
}

export default styled(FileSelectButton)`
	.input {
		display: none;
	}
`;
