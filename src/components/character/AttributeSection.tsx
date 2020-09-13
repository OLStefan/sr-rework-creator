import React from 'react';
import styled from 'styled-components';
import { noop } from 'lodash';
import { useLabels } from '../../hooks';
import {
	ATTRIBUTE_STRENGTH,
	ATTRIBUTE_AGILITY,
	ATTRIBUTE_BODY,
	ATTRIBUTE_INTELLIGENCE,
	ATTRIBUTE_WILLPOWER,
	ATTRIBUTE_CHARISMA,
	attributes as attributeNames,
} from '../../constants';
import Button from '../atoms/Button';
import { TFunction } from 'i18next';
import { useCharacterAttributes } from '../../redux/selectors';
import { Attribute } from '../../redux/character/characterTypes';

interface AttributeProps {
	attribute: Attribute;
	title: string;
	onChangeAttribute: () => void;
	className?: string;
}
const AttributeComponent = React.memo(function ({
	attribute,
	title,
	onChangeAttribute,
	...otherProps
}: AttributeProps) {
	return (
		<div {...otherProps}>
			<div className="title">{title}</div>
			<Button disabled={attribute.rating <= attribute.minRating} onClick={onChangeAttribute}>
				<div className="filler" />
				<div className="minus">‒</div>
			</Button>
			<input type="number" maxLength={2} value={attribute.rating} onChange={onChangeAttribute} />
			<Button disabled={attribute.rating >= attribute.maxRating} onClick={onChangeAttribute}>
				<div className="filler" />
				<div className="plus">+</div>
			</Button>
		</div>
	);
});

interface Props {}
function AttributeSection({ ...otherProps }: Props) {
	const attributes = useCharacterAttributes();
	const onChangeAttribute = noop;

	const { labels } = useLabels((t: TFunction) => ({
		[ATTRIBUTE_STRENGTH]: t(ATTRIBUTE_STRENGTH),
		[ATTRIBUTE_AGILITY]: t(ATTRIBUTE_AGILITY),
		[ATTRIBUTE_BODY]: t(ATTRIBUTE_BODY),
		[ATTRIBUTE_INTELLIGENCE]: t(ATTRIBUTE_INTELLIGENCE),
		[ATTRIBUTE_WILLPOWER]: t(ATTRIBUTE_WILLPOWER),
		[ATTRIBUTE_CHARISMA]: t(ATTRIBUTE_CHARISMA),
	}));

	return (
		<div {...otherProps}>
			{attributes && (
				<div className="attribute-container">
					{attributeNames.map((attributeName: string) => (
						<AttributeComponent
							key={attributeName}
							className="attribute"
							title={labels[attributeName]}
							attribute={attributes[attributeName]}
							{...{ onChangeAttribute }}
						/>
					))}
				</div>
			)}
			<div className="filler" />
		</div>
	);
}

export default styled(AttributeSection)`
	display: flex;

	.filler {
		flex: 1 1 50%;
	}

	.attribute-container {
		min-width: 225px;
		flex: 0 0 40%;
		display: grid;
		grid-template-columns: 1fr 2em 1fr 2em;
		grid-gap: var(--spacing-small);
		align-items: center;

		.attribute {
			display: contents;

			.title {
				font-size: 1.25em;
			}

			input {
				text-align: center;
				-moz-appearance: textfield;

				&::-webkit-outer-spin-button,
				&::-webkit-inner-spin-button {
					-webkit-appearance: none;
					margin: 0;
				}
			}

			${Button} {
				font-size: 1.5em;
				font-weight: var(--font-weight-bold);
				border-radius: 50%;
				display: grid;
				place-items: center;

				& > * {
					grid-area: 1/1;
				}

				.filler {
					padding-top: 100%;
				}
			}
		}
	}
`;
