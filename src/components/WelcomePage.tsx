import { TFunction } from 'i18next';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { useLabels } from '../hooks';
import { importCharacterThunk } from '../redux/storage/storageThunks';
import { selectCharacter } from '../redux/ui/uiActions';
import Button from './atoms/Button';
import Dropzone from './Dropzone';

function WelcomePage({ ...otherProps }) {
	const dispatch = useDispatch();

	const callbacks = useUpdatingCallbacks({
		importFile: (file: File) => dispatch(importCharacterThunk(file)),
		loadCharacter: () => dispatch(selectCharacter()),
	});

	const { labels } = useLabels((t: TFunction) => ({
		load: t('load'),
		dropText: t('dropText'),
		draggingText: t('draggingText'),
	}));

	return (
		<div {...otherProps} data-component="welcome-page">
			<Button className="load" onClick={callbacks.loadCharacter}>
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
	overflow-y: auto;

	.load,
	.dropzone {
		width: 50%;
	}

	.load {
		height: 10%;
		font-size: var(--card-title-font-size);
		min-height: 1.5em;
	}

	.dropzone {
		height: 25%;
		min-height: 5em;
		box-shadow: var(--card-shadow);
	}
`;
