import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { IMAGE_FILE_TYPE } from '../../../constants';
import characterActions from '../../../redux/editor/character/characterActions';
import { useCharacterDetails } from '../../../redux/selectors';
import { BaseProps } from '../../../types/props';
import Dropzone from '../../generic/atoms/Dropzone';

function DetailsSection({ ...otherProps }: BaseProps) {
	const dispatch = useDispatch();
	const details = useCharacterDetails();

	const callbacks = useUpdatingCallbacks({
		readFile(file: File) {
			dispatch(characterActions.readCharacterImage(file));
		},
	});

	return (
		<div {...otherProps} data-component="details-section">
			{details && (
				<>
					<div className="text-details"></div>
					<div className="picture">
						{details.mugshot ? (
							<img src={details.mugshot} />
						) : (
							<Dropzone readFile={callbacks.readFile} fileType={IMAGE_FILE_TYPE} text="Drop hier" />
						)}
					</div>
				</>
			)}
		</div>
	);
}

export default styled(DetailsSection)`
	display: flex;

	.text-details {
		flex: 1 0 0;
		height: 200px;
	}

	.picture {
		flex: 1 0 0;
		height: 200px;
		display: flex;
		justify-content: center;

		& > img {
			width: 100%;
			object-fit: contain;
		}
	}
`;
