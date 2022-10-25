import { AbstractThunkDescriptor, ActionCreatorBuilder, AllActions, FilterAction } from '../actionCreators';

export const UI_NAMESPACE = 'UiActions';
export const UI_TYPEGUARD = 'isUiAction';

const builder = new ActionCreatorBuilder(UI_NAMESPACE, UI_TYPEGUARD);

const creators = {
	showMenu() {
		return { type: builder.createType('showMenu') } as const;
	},
	hideMenu() {
		return { type: builder.createType('hideMenu') } as const;
	},
	changeDarkMode() {
		return { type: builder.createType('changeDarkMode') } as const;
	},
	startSelectingCharacter() {
		return { type: builder.createType('startSelectingCharacter') } as const;
	},
	setAllowStorage(value: boolean) {
		return { type: builder.createType('setAllowStorage'), value } as const;
	},
};

export default builder.createCreators<typeof creators, AbstractThunkDescriptor>(creators, {});
export type UiActions = AllActions<typeof creators>;
export type UiAction<Type extends keyof typeof creators> = FilterAction<typeof creators, Type>;
