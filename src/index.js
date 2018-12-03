import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import { itemsReportingReducer } from './reducers/itemsReportingReducer';
import { filtersReportingReducer } from './reducers/filtersReportingReducer';

const rootReducer = combineReducers({
    itemsReporting: itemsReportingReducer,
    filters: filtersReportingReducer
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
