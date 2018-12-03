import { SET_DATE_FILTER, SET_SCOPE_FILTER } from "../actions/filtersActions";

const filtersReducerDefaultState = {
    dateFilter: '',
    scopeFilter: ''
}

export const filtersReportingReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type){
        case SET_DATE_FILTER:
            console.log('filtre la date', action.payload)
            return {
                ...state,
                dateFilter: action.payload
            }
        case SET_SCOPE_FILTER:
            console.log('filtre le scope', action.payload)
            return {
                ...state,
                scopeFilter: action.payload
            }
        default:
            return state;
    }
}