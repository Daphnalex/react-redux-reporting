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

export const groupBy = (tableauObjets, propriete) =>{
    return tableauObjets.reduce(function (acc, obj) {
      var cle = obj[propriete];
      if(!acc[cle]){
        acc[cle] = [];
      }
      acc[cle].push(obj);
      console.log('ACC',acc)
      return acc;
    }, {});
  }

export const dataIsSuccess = (id, data,scope) => {
    console.log('récupère id',id)
    console.log("dans le action",data);
    console.log('data is success, scope',scope);
    var newData = [];
    switch(scope){
        case 'global':
            console.log('scope global');
            return {
                type: DATA_FETCH_SUCCESS,
                data: {array: data, id: id}
            }
        case 'client':
            console.log('scope client');
            data.map((array) => {
                return array.children.map((client) =>{
                    console.log('client',client);
                    var clientElement = {id: array.id, name: client.name, result: client.result};
                    newData = [...newData, clientElement];
                    return newData;
                })
            })
            newData = groupBy(newData, 'name');
            newData = Object.values(newData)
            console.log('newData scope',newData)
            return {
                type: DATA_FETCH_SUCCESS,
                data: {array: newData, id: id}
            }
        case "site":
            console.log('scope site');
            data.map((array) => {
                return array.children.map((client) =>{
                    return client.children.map((site) => {
                        console.log('site',site);
                        var siteElement = {id: array.id, name: site.name, result: site.result};
                        newData = [...newData, siteElement];
                        return newData;
                    })
                    
                })
            })
            newData = groupBy(newData, 'name');
            newData = Object.values(newData)
            console.log('newData scope',newData)
            return {
                type: DATA_FETCH_SUCCESS,
                data: {array: newData, id: id}
            }
        case "team":
            console.log('scope team');
            data.map((array) => {
                return array.children.map((client) =>{
                    return client.children.map((site) => {
                        return site.children.map((team) => {
                            console.log('team',team);
                            var teamElement = {id: array.id, name: team.name, result: team.result};
                            newData = [...newData, teamElement];
                            return newData;
                        });
                    });
                });
            });
            newData = groupBy(newData, 'name');
            newData = Object.values(newData)
            console.log('newData scope',newData)
            return {
                type: DATA_FETCH_SUCCESS,
                data: {array: newData, id: id}
            }
        default:
            console.log('scope global');
            return {
                type: DATA_FETCH_SUCCESS,
                data: {array: data, id: id}
            }
    }
        
    
}

export const apiFetchData = (url,id,scope) => {
    console.log('apiFetchData récupère scope',scope);
    console.log('entre dans apiFetchData',id)
    return (dispatch) => {
        console.log('on passe la valeur isLoading à true et ',id)
        dispatch(dataIsLoading(true,id));
        fetch(url)
            .then((response) => {
                console.log('ICI FETCH',response);
                if (!response.ok){
                    console.log('PAS DE REPONSE DE LA REQUETE')
                    throw Error(response.statusText);
                }
                
                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("DATA FETCH",data);
                dispatch(dataIsSuccess(id,data,scope));
                dispatch(dataIsLoading(false,id));
            })
            .catch(() => dispatch(dataHasErrored(true)));
    }
}