import { TFunction } from 'i18next';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { useLabels } from '../hooks';
import { importCharacterThunk } from '../redux/storage/storageThunks';
import Button from './atoms/Button';
import Dropzone from './Dropzone';

function WelcomePage({ ...otherProps }) {
	const dispatch = useDispatch();

	const callbacks = useUpdatingCallbacks({
		importFile: (file: File) => dispatch(importCharacterThunk(file)),
	});

	const { labels } = useLabels((t: TFunction) => ({
		load: t('load'),
		dropText: t('dropText'),
		draggingText: t('draggingText'),
	}));

	return (
		<div {...otherProps}>
			<Button className="load">
				<span>{labels.load}</span>
			</Button>
			<Dropzone
				readFile={callbacks.importFile}
				text={labels.dropText}
				textDragging={labels.draggingText}
				className="dropzone"
			/>
		</div>
	);
}

export default styled(WelcomePage)`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;

	.load,
	.dropzone {
		width: 50%;
		height: 25%;
	}

	.load {
		font-size: var(--card-title-font-size);
	}

	.dropzone {
		box-shadow: var(--card-shadow);
	}
`;
