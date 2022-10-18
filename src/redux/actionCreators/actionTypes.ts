// any needed for argument definitions

import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { State } from '../../types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Creator<Args extends any[] = any[], Return extends { type: unknown } = { type: unknown }> {
	(...args: Args): Return;
}

export type AbstractCreatorDescriptor = { [key: string]: Creator };
export type AbstractThunkDescriptor = { [key: string]: (...args: any[]) => Thunk };

/**
 * Extract all action types from an action creator object built by buildCreators
 */
export type AllActions<Descriptor extends AbstractCreatorDescriptor> = {
	[K in keyof Descriptor]: ReturnType<Descriptor[K]>;
}[keyof Descriptor];

export type FilterAction<Descriptor extends AbstractCreatorDescriptor, Filter extends keyof Descriptor> = ReturnType<
	Descriptor[Filter]
>;

/**
 * Extracts all types from an action creator object built by buildCreators
 */
export type AllTypes<Descriptor extends AbstractCreatorDescriptor> = AllActions<Descriptor>['type'];

export type Thunk<Return = void> = ThunkAction<Return, State, unknown, Action<string>>;
export type AsyncThunk<Return = void> = ThunkAction<PromiseLike<Return>, State, unknown, Action<string>>;
