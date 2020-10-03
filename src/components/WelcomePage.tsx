import { TFunction } from 'i18next';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { useLabels } from '../hooks';
import { createNewCharacterThunk, importCharacterThunk } from '../redux/storage/storageThunks';
import { selectCharacter } from '../redux/ui/uiActions';
import Button from './atoms/Button';
import Dropzone from './Dropzone';

function WelcomePage({ ...otherProps }) {
	const dispatch = useDispatch();

	const callbacks = useUpdatingCallbacks({
		importFile: (file: File) => dispatch(importCharacterThunk(file)),
		newCharacter: () => dispatch(createNewCharacterThunk()),
		loadCharacter: () => dispatch(selectCharacter()),
	});

	const { labels } = useLabels((t: TFunction) => ({
		newCharacter: t('newCharacter'),
		load: t('load'),
		dropText: t('dropText'),
	}));

	return (
		<div {...otherProps} data-component="welcome-page">
			<Button className="new" onClick={callbacks.newCharacter}>
				<span>{labels.newCharacter}</span>
			</Button>
			<Button className="load" onClick={callbacks.loadCharacter}>
				<span>{labels.load}</span>
			</Button>
			<Dropzone readFile={callbacks.importFile} text={labels.dropText} className="dropzone" />
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

	.new,
	.load,
	.dropzone {
		width: 50%;
	}
	.new,
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
