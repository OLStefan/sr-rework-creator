import { TFunction } from 'i18next';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { CHARCTER_FILE_TYPE } from '../constants';
import { useLabels } from '../hooks';
import storageActions from '../redux/storage/storageActions';
import uiActions from '../redux/ui/uiActions';
import { BaseProps } from '../types';
import { useDispatch } from '../utils/store';
import Button from './atoms/Button';
import Dropzone from './atoms/Dropzone';

function WelcomePage({ ...otherProps }: BaseProps) {
	const dispatch = useDispatch();

	const callbacks = useUpdatingCallbacks({
		importFile(file: File) {
			dispatch(storageActions.importCharacter(file));
		},
		newCharacter() {
			dispatch(storageActions.createNewCharacter());
		},
		loadCharacter() {
			dispatch(uiActions.startSelectingCharacter());
		},
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
			<Dropzone
				readFile={callbacks.importFile}
				text={labels.dropText}
				fileType={CHARCTER_FILE_TYPE}
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
