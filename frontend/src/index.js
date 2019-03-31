import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';

/* Configure Redux & Provide Store  */
import { Provider } from 'react-redux';
import configureStore from './store';

/* Importing antd style sheet at Root Component */
import 'antd/dist/antd.css';

ReactDOM.render(
    <Provider store={configureStore()}>
        <App/>
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
