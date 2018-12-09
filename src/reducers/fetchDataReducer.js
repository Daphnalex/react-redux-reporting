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
    console.log('REDUCER DATA IS LOADING (1):')
    console.log('state (1):',state);
    console.log('action (1):',action);
    switch (action.type) {
        case DATA_IS_LOADING:
            var j=0;
            var newState = state.map((item,i)=> {
                
                if (item.id !== action.isLoading.id){
                    console.log('Si id différents on retourne item',item);
                    return item;
                } else {
                    console.log('si id identique on retourne le nouvel item',action.isLoading);
                    j++;
                    return action.isLoading;
                }  
            });
            if (j===0){
                console.log('si pas de modification de dataIsLoading trouvé on ajoute le nouvel item',[...state,action.isLoading]);
                return [...state, action.isLoading]; 
            } else {
                console.log('s il y a eu modification c etait un update on retourne le nouveau state',newState);
                return newState;
            }
            
        default:
            console.log('Pas dans le reducer isLoading on retourne state',state);
            return state;
    }
}

export const data = (state = [], action) => {
    console.log('REDUCER DE LA DATA (2):');
    console.log('state (2):',state);
    console.log('action (2):', action)
    switch(action.type){
        case DATA_FETCH_SUCCESS:
            var j=0;
            var newState = state.map((item,i) => {
                if (item.id !== action.data.id){
                    console.log('(2)si id different on retourne item',item);
                    return item;
                } else {
                    console.log('(2)si id identique on met à jour item par', {...item,...action.data});
                    j++;
                    return {...item,...action.data};
                }
            }); 
            if (j===0){
                console.log('(2) pas de modifications de data donc on en ajoute une',[...state,action.data]);
                return [...state, action.data];
            } else {
                console.log('(2) sinon on remplace state par newState',newState);
                return newState;
            }
        default:
            console.log('(2) pas dans le bon reducer')
            return state;
    }
    
}