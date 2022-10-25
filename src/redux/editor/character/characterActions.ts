import { encode } from 'uint8-to-base64';
import { MAX_IMAGE_SIZE } from '../../../constants';
import { AttributeName, CharacterState, Details } from '../../../types';
import { ActionCreatorBuilder, AllActions, FilterAction, Thunk } from '../../actionCreators';

export const CHARACTER_NAMESPACE = 'CharacterActions';
export const CHARACTER_TYPEGUARD = 'isCharacterAction';

const imageTypeRegex = new RegExp('image/.+');

const builder = new ActionCreatorBuilder(CHARACTER_NAMESPACE, CHARACTER_TYPEGUARD);

const creators = {
	changeAttribute(attributeName: AttributeName, change: number) {
		return { type: builder.createType('changeAttribute'), attributeName, change };
	},
	changeDetail(attribute: keyof Omit<Details, 'state' | 'mugshot'>, newValue?: string) {
		return { type: builder.createType('changeDetail'), attribute, newValue };
	},
	changeState(newState: CharacterState) {
		return { type: builder.createType('changeState'), newState };
	},
	setMugshot(base64Image?: string) {
		return { type: builder.createType('setMugshot'), base64Image };
	},
};

const thunks = {
	readCharacterImage(file: File) {
		const thunk: Thunk = (dispatch) => {
			if (!imageTypeRegex.test(file.type)) {
				return;
			}

			if (file.size > MAX_IMAGE_SIZE) {
				// TODO: Show error to user
				return;
			}

			file.arrayBuffer().then((arrayBuffer) => {
				const bytes = new Uint8Array(arrayBuffer);
				const base64String = `data:${file.type};base64,${encode(bytes)}`;
				dispatch(creators.setMugshot(base64String));
			});
		};

		return thunk;
	},
};

export default builder.createCreators<typeof creators, typeof thunks>(creators, thunks);
export type CharacterActions = AllActions<typeof creators>;
export type CharacterAction<Type extends keyof typeof creators> = FilterAction<typeof creators, Type>;
