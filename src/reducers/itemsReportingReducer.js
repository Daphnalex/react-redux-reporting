import { ADD_ITEM, UPDATE_ITEM } from "../actions/itemsActions";

export const itemsReporting = (state = [], action) => {
    // console.log('(3) REDUCER ITEMS REPORTING:');
    // console.log('(3) state:',state);
    // console.log('(3) action:',action);
    switch(action.type){
        case ADD_ITEM:
            //console.log('(3) Nouvel item on ajoute',[...state,action.payload]);
            return [...state, action.payload];
        case UPDATE_ITEM:
            //console.log('(3) Mise à jour de item')
            var newState = state.map((item) => {
                if (item.id !== action.payload.id){
                    //console.log('(3) si id différents on retourne item',item);
                    return item
                } else {
                    //console.log('(3) si id égaux on remplace item par le nouvel item',{...item,...action.payload});
                    return {...item,...action.payload}
                }
            });
            //console.log('(3) newState de itemsReporting:', newState);
            return newState;
        default:
            return state;
    }
}