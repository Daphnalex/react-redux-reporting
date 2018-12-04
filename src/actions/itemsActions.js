
export const ADD_ITEM = 'ADD_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';


const addElementReportingAction = (elementReporting) => {
    console.log('affiche bloc dans action',elementReporting);
    return {
        type: ADD_ITEM,
        payload: elementReporting
    }
}

const updateElementReportingAction = (elementReporting) => {
    console.log('mets à jour le bloc',elementReporting);
    return {
        type: UPDATE_ITEM,
        payload: elementReporting
    }
}

export {addElementReportingAction,updateElementReportingAction};