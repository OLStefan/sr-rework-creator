import { encode } from 'uint8-to-base64';
import { ActionCreatorBuilder, AllActions, AttributeName, FilterAction, Thunk } from '../../../types';

export const CHARACTER_NAMESPACE = 'CharacterActions';
export const CHARACTER_TYPEGUARD = 'isCharacterAction';

const imageTypeRegex = new RegExp('image/.+');

const builder = new ActionCreatorBuilder(CHARACTER_NAMESPACE, CHARACTER_TYPEGUARD);

const creators = {
	changeAttribute(attributeName: AttributeName, change: number) {
		return { type: builder.createType('changeAttribute'), attributeName, change };
	},
	setImage(base64Image?: string) {
		return { type: builder.createType('setImage'), base64Image };
	},
};

const thunks = {
	readCharacterImage(file: File) {
		const thunk: Thunk = (dispatch) => {
			if (!imageTypeRegex.test(file.type)) {
				return;
			}

			file.arrayBuffer().then((arrayBuffer) => {
				const bytes = new Uint8Array(arrayBuffer);
				const base64String = `data:${file.type};base64,${encode(bytes)}`;
				dispatch(creators.setImage(base64String));
			});
		};

		return thunk;
	},
};

export default builder.createCreators(creators, thunks);
export type CharacterActions = AllActions<typeof creators>;
export type CharacterAction<Type extends keyof typeof creators> = FilterAction<typeof creators, Type>;
