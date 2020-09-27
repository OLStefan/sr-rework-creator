import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { FILE_ENDING } from '../constants';

interface Props {
	readFile: (file: File) => void;
	text: string;
	textDragging: string;
	className?: string;
}
function Dropzone({ readFile, text, textDragging, ...otherProps }: Props) {
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
				console.log('No file');
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
	justify-content: space-evenly;
	align-items: center;
	font-size: var(--card-title-font-size);
	border-radius: var(--border-radius);

	.symbol,
	.drop-text {
		pointer-events: none;
	}

	.symbol {
		font-family: 'icomoon';
		font-size: 3em;
		margin: 0;
	}

	.input {
		display: none;
	}
`;
