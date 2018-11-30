
const addElementReportingAction = (elementReporting) => {
    console.log('affiche bloc dans action',elementReporting);
    return {
        type: 'ADD_ITEM',
        payload: elementReporting
    }
}


export {addElementReportingAction};