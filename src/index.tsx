import { throttle } from 'lodash';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import App from './App';
import './default.css';
import './externalizedStrings/i18n';
import rootReducer from './redux/rootReducer';
import { loadState, saveState } from './redux/storage/localStorage';

const persistedState = loadState();
const store = createStore(rootReducer, persistedState, composeWithDevTools(applyMiddleware(thunk)));
store.subscribe(throttle(() => saveState(store.getState()), 1000));

ReactDOM.render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>,
	document.getElementById('root'),
);
