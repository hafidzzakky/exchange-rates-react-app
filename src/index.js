import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import App from './Screen/home';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';
import Reducers from './Reducers';
import 'bootstrap/dist/css/bootstrap.min.css';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const Store = createStore(Reducers, composeEnhancer(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={Store}>
        <App />
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
