import { configureStore } from '@reduxjs/toolkit';
import { throttle } from 'lodash';
import { useDispatch as useDispatchUntyped } from 'react-redux';
import rootReducer from '../redux/rootReducer';
import { loadState, saveState } from '../redux/storage/localStorage';
import isDev from './isDev';

export const store = configureStore({
	preloadedState: loadState(),
	reducer: rootReducer,
	devTools: isDev(),
});
store.subscribe(throttle(() => saveState(store.getState()), 1000));

export const useDispatch: () => typeof store.dispatch = useDispatchUntyped;
