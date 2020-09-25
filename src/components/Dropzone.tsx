import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { ALLOWED_FILE_TYPES } from '../constants';
import { readCharacterFile } from '../redux/character/characterThunks';

function Dropzone({ ...otherProps }) {
	const dispatch = useDispatch();
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
			dispatch(readCharacterFile(file));
		},
		onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files && event.target.files[0];
			if (!file) {
				console.log('No file');
				return;
			}
			dispatch(readCharacterFile(file));
		},
	});

	return (
		<div
			onDragEnter={callbacks.onDragEnter}
			onDragOver={callbacks.onDragOver}
			onDragLeave={callbacks.onDragLeave}
			onDrop={callbacks.onDrop}
			onClick={() => inputRef.current?.click()}
			{...otherProps}>
			<input
				type="file"
				className="input"
				accept={ALLOWED_FILE_TYPES}
				multiple={false}
				ref={inputRef}
				onChange={callbacks.onInputChange}
			/>
			{isDragActive ? (
				<p className="drop-text">Drop the files here ...</p>
			) : (
				<p className="drop-text">Drag 'n' drop some files here, or click to select files</p>
			)}
		</div>
	);
}

export default styled(Dropzone)`
	width: 100%;
	height: 100%;
	display: grid;
	place-items: center;
	font-size: var(--card-title-font-size);
	background: unset;
	border-radius: unset;

	&:hover {
		background: unset;
	}

	.drop-text {
		text-align: center;
	}

	.input {
		display: none;
	}
`;
