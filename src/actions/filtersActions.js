export const SET_DATE_FILTER = 'SET_DATE_FILTER';
export const SET_SCOPE_FILTER = 'SET_SCOPE_FILTER';

const setDateFilterAction = (dateFilter) => {
    return {
        type: SET_DATE_FILTER,
        payload: dateFilter
    }
}

const setScopeFilterAction = (scopeFilter) => {
    return {
        type: SET_SCOPE_FILTER,
        payload: scopeFilter
    }
}

export {setDateFilterAction,setScopeFilterAction};