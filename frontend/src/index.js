import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';

/* Configure Redux & Provide Store  */
import { Provider } from 'react-redux';
import configureStore from './store';

ReactDOM.render(
    <Provider store={configureStore()}>
        <App/>
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
