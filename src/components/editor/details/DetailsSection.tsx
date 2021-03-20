import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { IMAGE_FILE_TYPE } from '../../../constants';
import characterActions from '../../../redux/editor/character/characterActions';
import { useCharacterDetails } from '../../../redux/selectors';
import Dropzone from '../../generic/atoms/Dropzone';
import TextArea from '../../generic/atoms/TextArea';

function DetailsSection({ ...otherProps }: BaseProps) {
	const dispatch = useDispatch();
	const details = useCharacterDetails();

	const callbacks = useUpdatingCallbacks({
		readFile(file: File) {
			dispatch(characterActions.readCharacterImage(file));
		},
	});

	if (!details) {
		return null;
	}

	return (
		<div {...otherProps} data-component="details-section">
			<div className="text-details">
				<TextArea className="text-area" autosize maxRows={10} minRows={2} />
			</div>
			<div className="picture">
				<label className="label">Portrait:</label>
				{details.mugshot ? (
					<div className="image-container">
						<img src={details.mugshot} />
					</div>
				) : (
					<Dropzone readFile={callbacks.readFile} fileType={IMAGE_FILE_TYPE} text="Drop hier" />
				)}
			</div>
		</div>
	);
}

export default styled(DetailsSection)`
	display: flex;

	.label {
		font-size: 1.25em;
	}

	.text-details {
		flex: 2 0 0;
		height: 200px;
		padding-right: var(--spacing-small);

		.text-area {
			resize: none;
			width: 100%;
		}
	}

	.picture {
		flex: 1 0 0;
		height: 200px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;

		.image-container {
			position: relative;
			min-width: 0;

			img {
				width: 100%;
				object-fit: contain;
			}
		}
	}
`;
