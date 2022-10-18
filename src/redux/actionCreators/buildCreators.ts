// any needed for argument definitions

import { AbstractCreatorDescriptor, AbstractThunkDescriptor, AllActions, Creator, Thunk } from './actionTypes';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type MapDescriptor<
	Prefix extends string,
	Descriptor extends AbstractCreatorDescriptor | AbstractThunkDescriptor,
> = {
	[K in keyof Descriptor]: K extends string
		? Descriptor[K] extends Creator<any[], { type: `${Prefix}.${K}` }> | ((...args: any[]) => Thunk)
			? Descriptor[K]
			: Creator<any[], { type: `${Prefix}.${K}` }>
		: never;
};

export type ExtractConstants<Descriptor extends AbstractCreatorDescriptor> = {
	[K in keyof Descriptor]: ReturnType<Descriptor[K]>['type'];
};

export type Guard<Descriptor extends AbstractCreatorDescriptor> = (x: { type: unknown }) => x is AllActions<Descriptor>;

export type Keyof<Something extends Record<string, unknown>> = Record<string, never> extends Something
	? never
	: keyof Something;

export type ExtendedDescriptor<
	CreatorDescriptor extends AbstractCreatorDescriptor,
	ThunkDescriptor extends AbstractThunkDescriptor,
	TypeGuard extends string,
> = TypeGuard extends Keyof<CreatorDescriptor> | Keyof<ThunkDescriptor> | 'types'
	? Keyof<CreatorDescriptor> | Keyof<ThunkDescriptor> | 'types'
	: {
			[K in Keyof<CreatorDescriptor> | Keyof<ThunkDescriptor> | 'types' | TypeGuard]: 'types' extends K
				? ExtractConstants<CreatorDescriptor>
				: TypeGuard extends K
				? Guard<CreatorDescriptor>
				: K extends keyof CreatorDescriptor
				? CreatorDescriptor[K]
				: K extends keyof ThunkDescriptor
				? ThunkDescriptor[K]
				: never;
			// eslint-disable-next-line no-mixed-spaces-and-tabs
	  };

export class ActionCreatorBuilder<Prefix extends string, TypeGuard extends string> {
	constructor(private prefix: Prefix, private typeGuard: TypeGuard) {}

	createType<Name extends string>(name: Name) {
		return `${this.prefix}.${name}` as `${Prefix}.${Name}`;
	}

	createCreators<CreatorDescriptor extends AbstractCreatorDescriptor, ThunkDescriptor extends AbstractThunkDescriptor>(
		creators: MapDescriptor<Prefix, CreatorDescriptor>,
		thunks: MapDescriptor<Prefix, ThunkDescriptor>,
	) {
		const creatorKeys = Object.keys(creators);
		const types = creatorKeys.map((creator) => `${this.prefix}.${creator}`);

		return {
			...creators,
			...thunks,
			types: creatorKeys.reduce((previous, action) => ({ ...previous, [action]: `${this.prefix}.${action}` }), {}),
			[this.typeGuard](x: { type: unknown }): x is AllActions<CreatorDescriptor> {
				return typeof x.type === 'string' && types.includes(x.type);
			},
		} as unknown as ExtendedDescriptor<CreatorDescriptor, ThunkDescriptor, TypeGuard>;
	}
}
