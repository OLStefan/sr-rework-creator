import { ActionCreatorBuilder, AllActions, AttributeName, FilterAction } from '../../../types';

export const CHARACTER_NAMESPACE = 'CharacterActions';
export const CHARACTER_TYPEGUARD = 'isCharacterAction';

const builder = new ActionCreatorBuilder(CHARACTER_NAMESPACE, CHARACTER_TYPEGUARD);

const creators = {
	changeAttribute(attributeName: AttributeName, change: number) {
		return { type: builder.createType('changeAttribute'), attributeName, change };
	},
};

export default builder.createCreators(creators, {});
export type CharacterActions = AllActions<typeof creators>;
export type CharacterAction<Type extends keyof typeof creators> = FilterAction<typeof creators, Type>;
