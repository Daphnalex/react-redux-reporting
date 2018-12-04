export const DATA_HAS_ERRORED = "DATA_HAS_ERRORED";
export const DATA_IS_LOADING = "DATA_IS_LOADING";
export const DATA_FETCH_SUCCESS = "DATA_FETCH_SUCESS";
export const API_FETCH_DATA = "API_FETCH_DATA";

export const dataHasErrored = (bool) =>{
    return {
        type: DATA_HAS_ERRORED,
        hasErrored: bool
    }
}

export const dataIsLoading = (bool) => {
    return {
        type: DATA_IS_LOADING,
        isLoading: bool
    }
}

export const dataIsSuccess = (data) => {
    console.log("dans le action",data)
    return {
        type: DATA_FETCH_SUCCESS,
        data: data
    }
}

export const apiFetchData = (url) => {
    return (dispatch) => {
        dispatch(dataIsLoading(true));
        fetch(url)
            .then((response) => {
                if (!response.ok){
                    throw Error(response.statusText);
                }
                console.log('ICI FETCH')
                dispatch(dataIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("DATA FETCH",data);
                dispatch(dataIsSuccess(data));
            })
            .catch(() => dispatch(dataHasErrored(true)));
    }
}