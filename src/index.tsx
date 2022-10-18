import './default.css';
import './externalizedStrings/i18n';

import { configureStore } from '@reduxjs/toolkit';
import { throttle } from 'lodash';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import rootReducer from './redux/rootReducer';
import { loadState, saveState } from './redux/storage/localStorage';
import { isDev } from './utils';

const store = configureStore({
	preloadedState: loadState(),
	reducer: rootReducer,
	devTools: isDev(),
});
store.subscribe(throttle(() => saveState(store.getState()), 1000));

ReactDOM.render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>,
	document.getElementById('root'),
);
