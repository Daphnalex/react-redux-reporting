import { DATA_HAS_ERRORED, DATA_IS_LOADING, DATA_FETCH_SUCCESS } from "../actions/fetchActions";

export const dataHasErrored = (state = false, action) => {
    switch (action.type) {
        case DATA_HAS_ERRORED :
            return action.hasErrored;
        default:
            return state;
    }
}

export const dataIsLoading = (state = [], action) => {
    console.log('reducer dataIsLoading',action)
    switch (action.type) {
        case DATA_IS_LOADING:
            if (state.length === 0){
                return [...state, action.isLoading]
            } else {
                 state.map((item,i)=> {
                    if (item.id === action.isLoading.id){
                        console.log('1er if de action isLoading')
                        state[i].bool = action.isLoading.bool;
                        alert('trouvé !!!!');
                        return state;
                    }
                    if ((i === state.length - 1)&&(item.id !== action.isLoading.id)){
                        alert('rien trouvé');
                        console.log('2eme if de action isLoading')
                        state = [...state, action.isLoading]
                        return state;
                    }
                });  
            }
        default:
            return state;
    }
}

export const data = (state = [], action) => {
    console.log('data in fetch reducer',action)
    switch(action.type){
        case DATA_FETCH_SUCCESS:
            if (state.length === 0){
                return [...state, action.data]
            } else {
                return state.map((item) => {
                    if (item.id !== action.data.id){
                        return item
                    }
                    console.log('data reducer function before last return')
                    return {
                        ...item,
                        ...action.data
                    }
                })  
                
            }
        default:
            return state;
    }
    
}