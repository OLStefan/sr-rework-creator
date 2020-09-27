import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import rootReducer from './redux/rootReducer';

import './external-strings/i18n';
import { loadState, saveState } from './redux/storage/localStorage';
import { throttle } from 'lodash';

const persistedState = loadState();
const store = createStore(rootReducer, persistedState, composeWithDevTools(applyMiddleware(thunk)));
store.subscribe(throttle(() => saveState(store.getState()), 1000));

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);
