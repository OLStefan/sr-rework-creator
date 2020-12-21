import { ActionCreatorBuilder, AllActions, FilterAction, SectionName } from '../../types';

export const EDITOR_NAMESPACE = 'EditorActions';
export const EDITOR_TYPEGUARD = 'isEditorAction';

const builder = new ActionCreatorBuilder(EDITOR_NAMESPACE, EDITOR_TYPEGUARD);

const creators = {
	toggleCard(cardName: SectionName) {
		return { type: builder.createType('toggleCard'), cardName } as const;
	},
};

export default builder.createCreators(creators, {});
export type EditorActions = AllActions<typeof creators>;
export type EditorAction<Type extends keyof typeof creators> = FilterAction<typeof creators, Type>;
