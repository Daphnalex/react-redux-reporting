import { ADD_ITEM, UPDATE_ITEM } from "../actions/itemsActions";

export const itemsReporting = (state = [], action) => {
    switch(action.type){
        case ADD_ITEM:
            //console.log('add item',action);
            return [...state, action.payload];
        case UPDATE_ITEM:
            console.log('je rentre dans le reducers de items');
            // var newState = [];
            // state.map((item,i)=> {
            //     if (item.id === action.payload.id){
            //         alert('trouvé !!!!');
                    
            //         newState = [...newState, action.payload];
            //     } else {
            //         newState = [...newState, item]
            //     }
            //     console.log('avant de retourner le state',newState)
            //     return newState;
            // }); 
            return state.map((item) => {
                if (item.id !== action.payload.id){
                    return item
                }
                console.log('update item reducer other')
                return {
                    ...item,
                    ...action.payload
                }
            }) 
        default:
            return state;
    }
}