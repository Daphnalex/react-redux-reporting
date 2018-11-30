
export const itemsReportingReducer = (state = [], action) => {
    switch(action.type){
        case 'ADD_ITEM':
            console.log('add item',action);
            action.payload.id = Date.now();
            return [...state, action.payload];
        
        default:
            return state;
    }
}