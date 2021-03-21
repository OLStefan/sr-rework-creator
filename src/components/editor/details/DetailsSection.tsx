import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { IMAGE_FILE_TYPE } from '../../../constants';
import { useLabels } from '../../../hooks';
import characterActions from '../../../redux/editor/character/characterActions';
import { useCharacterDetails } from '../../../redux/selectors';
import { CharacterState } from '../../../types';
import Dropzone from '../../atoms/Dropzone';
import LabeledContent from '../../atoms/LabeledContent';
import TextArea from '../../atoms/TextArea';
import TextField from '../../atoms/TextField';

function DetailsSection({ ...otherProps }: BaseProps) {
	const dispatch = useDispatch();
	const details = useCharacterDetails();

	const callbacks = useUpdatingCallbacks({
		loadImage(file: File) {
			dispatch(characterActions.readCharacterImage(file));
		},
		clearImage() {
			dispatch(characterActions.setMugshot());
		},
		updateName(event: React.ChangeEvent<HTMLInputElement>) {
			dispatch(characterActions.changeDetail('name', event.target.value));
		},
		updatePlayer(event: React.ChangeEvent<HTMLInputElement>) {
			dispatch(characterActions.changeDetail('player', event.target.value));
		},
		updateDescription(event: React.ChangeEvent<HTMLTextAreaElement>) {
			dispatch(characterActions.changeDetail('description', event.target.value));
		},
		updateBackground(event: React.ChangeEvent<HTMLTextAreaElement>) {
			dispatch(characterActions.changeDetail('background', event.target.value));
		},
		updateNotes(event: React.ChangeEvent<HTMLTextAreaElement>) {
			dispatch(characterActions.changeDetail('notes', event.target.value));
		},
	});

	const { labels } = useLabels((translate) => ({
		name: translate('name'),
		player: translate('player'),
		state: translate('state'),
		currentState: (state: CharacterState) => translate(state),
		mugshot: translate('mugshot'),
		dropImage: translate('dropImage'),
		removeImage: translate('removeImage'),
		description: translate('description'),
		background: translate('background'),
		notes: translate('notes'),
	}));

	if (!details) {
		return null;
	}

	return (
		<div {...otherProps} data-component="details-section">
			{useMemo(
				() => (
					<LabeledContent title={labels.name} className="name text-field-container">
						<TextField className="text-field" value={details.name} onChange={callbacks.updateName} />
					</LabeledContent>
				),
				[details.name, callbacks, labels],
			)}
			{useMemo(
				() => (
					<LabeledContent title={labels.player} className="player-name text-field-container">
						<TextField className="text-field" value={details.player} onChange={callbacks.updatePlayer} />
					</LabeledContent>
				),
				[details.player, callbacks, labels],
			)}
			{useMemo(
				() => (
					<LabeledContent title={labels.state} className="state text-field-container">
						<label className="state-label">{labels.currentState(details.state)}</label>
					</LabeledContent>
				),
				[details.state, labels],
			)}

			{useMemo(
				() => (
					<LabeledContent title={labels.mugshot} className="picture">
						{details.mugshot ? (
							<div className="image-container">
								<div className="remove-image" role="button" onClick={callbacks.clearImage}>
									{labels.removeImage}
								</div>
								<img src={details.mugshot} />
							</div>
						) : (
							<Dropzone readFile={callbacks.loadImage} fileType={IMAGE_FILE_TYPE} text={labels.dropImage} />
						)}
					</LabeledContent>
				),
				[details.mugshot, callbacks, labels],
			)}

			{useMemo(
				() => (
					<LabeledContent title={labels.description} className="description large">
						<TextArea
							className="text-area"
							autosize
							maxRows={12}
							minRows={3}
							value={details.description}
							onChange={callbacks.updateDescription}
						/>
					</LabeledContent>
				),
				[details.description, callbacks, labels],
			)}
			{useMemo(
				() => (
					<LabeledContent title={labels.background} className="background large">
						<TextArea
							className="text-area"
							autosize
							maxRows={12}
							minRows={3}
							value={details.background}
							onChange={callbacks.updateBackground}
						/>
					</LabeledContent>
				),
				[details.background, callbacks, labels],
			)}
			{useMemo(
				() => (
					<LabeledContent title={labels.notes} className="notes large">
						<TextArea
							className="text-area"
							autosize
							maxRows={12}
							minRows={3}
							value={details.notes}
							onChange={callbacks.updateNotes}
						/>
					</LabeledContent>
				),
				[details.notes, callbacks, labels],
			)}
		</div>
	);
}

export default styled(DetailsSection)`
	display: grid;
	grid-template-columns:
		minmax(var(--details-textfield-min), var(--details-textfield-max))
		1fr
		min(50%, var(--details-portrait-max));
	grid-template-rows: repeat(3, var(--details-row-size));
	align-items: center;

	.large {
		grid-column: 1/4;
	}

	.title {
		font-size: var(--card-content-text-size);
	}

	.text-field-container {
		grid-column: 1;

		.text-field {
			font-size: var(--card-content-text-size);
		}
	}

	.state-label {
		font-size: var(--card-content-text-size);
	}

	.picture {
		grid-row: 1/4;
		grid-column: 3;
		align-self: stretch;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;

		.symbol {
			font-size: 250%;
		}

		.image-container {
			position: relative;
			min-width: 0;
			min-height: 0;

			&:hover {
				.remove-image {
					display: block;
				}
			}

			.remove-image {
				position: absolute;
				right: 0;
				top: 0;
				background-color: var(--background);
				padding: var(--spacing-small);
				display: none;
				border-radius: 0 0 0 var(--border-radius);

				&:hover {
					text-decoration: underline;
				}
			}

			img {
				width: 100%;
				height: 100%;
				object-fit: contain;
			}
		}
	}

	.description,
	.background,
	.notes {
		.text-area {
			resize: none;
			width: 100%;
			max-height: 100%;
			max-width: 100%;
		}
	}
`;
