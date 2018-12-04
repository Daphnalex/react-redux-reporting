import { ADD_ITEM, UPDATE_ITEM } from "../actions/itemsActions";

export const itemsReporting = (state = [], action) => {
    switch(action.type){
        case ADD_ITEM:
            //console.log('add item',action);
            action.payload.id = Date.now();
            return [...state, action.payload];
        case UPDATE_ITEM:
            console.log("action",action)
            const itemId = action.payload.id;
            console.log('update item n°',itemId);
            return state.map(item => {
                if(item.id !== itemId){
                    console.log('action in update',action.payload)
                    return action.payload;
                }
                
            })
        default:
            return state;
    }
}