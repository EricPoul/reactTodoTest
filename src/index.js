import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Redusers from './reduser';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

const store = createStore(Redusers);
window.store = store;


ReactDOM.render(
    <Router  basename="/">
        <Provider store={store}>
        <App/>
        </Provider>
    </Router>, document.getElementById('root'));
registerServiceWorker();
