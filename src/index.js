import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import { itemsReportingReducer } from './reducers/itemsReportingReducer';

const rootReducer = combineReducers({
    itemsReporting: itemsReportingReducer
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk),
)

window.store = store;

ReactDOM.render(
<Provider store = {store} >
    <App />
</Provider>, document.getElementById('root'));
