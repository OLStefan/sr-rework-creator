import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { FILE_ENDING } from '../../../constants';

interface Props {
	readFile: (file: File) => void;
	text: string;
	className?: string;
}
function Dropzone({ readFile, text, ...otherProps }: Props) {
	const inputRef = useRef<HTMLInputElement>(null);

	const [isDragActive, setDragActive] = useState<boolean>(false);

	const callbacks = useUpdatingCallbacks({
		onDragEnter: () => setDragActive(true),
		onDragLeave: () => setDragActive(false),
		onDragOver: (event: React.DragEvent) => {
			event.stopPropagation();
			event.preventDefault();
			event.dataTransfer.dropEffect = 'copy';
		},
		onDrop: (event: React.DragEvent) => {
			event.stopPropagation();
			event.preventDefault();
			setDragActive(false);
			const file = event.dataTransfer.files[0];
			readFile(file);
		},
		onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files && event.target.files[0];
			if (!file) {
				return;
			}
			readFile(file);
		},
	});

	return (
		<div
			onDragEnter={callbacks.onDragEnter}
			onDragOver={callbacks.onDragOver}
			onDragLeave={callbacks.onDragLeave}
			onDrop={callbacks.onDrop}
			onClick={() => inputRef.current?.click()}
			style={{ background: isDragActive ? 'var(--primary-color-tint)' : '' }}
			{...otherProps}>
			<input
				type="file"
				className="input"
				accept={FILE_ENDING}
				multiple={false}
				ref={inputRef}
				onChange={callbacks.onInputChange}
			/>
			<p className="symbol">&#xe960;</p>
			<p className="drop-text">{text}</p>
		</div>
	);
}

export default styled(Dropzone)`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	font-size: var(--card-title-font-size);
	border-radius: var(--border-radius);
	padding: var(--spacing-small);

	.symbol,
	.drop-text {
		pointer-events: none;
		margin: 0;
	}

	.symbol {
		font-family: 'icomoon';
		font-size: 2.5em;
	}

	.drop-text {
		text-align: center;
	}

	.input {
		display: none;
	}
`;
