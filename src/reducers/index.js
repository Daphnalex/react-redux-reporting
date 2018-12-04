import {combineReducers} from 'redux';
import {data, dataHasErrored, dataIsLoading } from './fetchDataReducer';
import {itemsReporting} from './itemsReportingReducer';

export default combineReducers({
    data,
    dataHasErrored,
    dataIsLoading,
    itemsReporting
});