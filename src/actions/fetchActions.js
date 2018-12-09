export const DATA_HAS_ERRORED = "DATA_HAS_ERRORED";
export const DATA_IS_LOADING = "DATA_IS_LOADING";
export const DATA_FETCH_SUCCESS = "DATA_FETCH_SUCCESS";
export const API_FETCH_DATA = "API_FETCH_DATA";

export const dataHasErrored = (bool) =>{
    return {
        type: DATA_HAS_ERRORED,
        hasErrored: bool
    }
}

export const dataIsLoading = (bool,id) => {
    console.log('ID dans dataIsLoading',id);
    console.log('on la passe à',bool)
    if (id !== undefined){
        console.log('on récupère isLoading',{bool: bool,id: id});
        return {
            type: DATA_IS_LOADING,
            isLoading: {bool: bool, id: id}
        }
    } 
}

export const dataIsSuccess = (id, data) => {
    console.log("dans le action",data)
    return {
        type: DATA_FETCH_SUCCESS,
        data: {array: data, id: id}
    }
}

export const apiFetchData = (url,id) => {
    console.log('entre dans apiFetchData',id)
    return (dispatch) => {
        console.log('on passe la valeur isLoading à true et ',id)
        dispatch(dataIsLoading(true,id));
        fetch(url)
            .then((response) => {
                if (!response.ok){
                    throw Error(response.statusText);
                }
                console.log('ICI FETCH')
                dispatch(dataIsLoading(false,id));
                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("DATA FETCH",data);
                dispatch(dataIsSuccess(id,data));
            })
            .catch(() => dispatch(dataHasErrored(true)));
    }
}