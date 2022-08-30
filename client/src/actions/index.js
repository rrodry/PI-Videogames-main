import axios from 'axios'

export function VideogamesAll() {
    return async function (dispatch) {
        const dataBack = await axios.get('http://localhost:3001/videogames')
        const dataGen = await axios.get('http://localhost:3001/genres')
        return dispatch({
            type: "GET_VIDEOGAMES",
            payload: dataBack.data,
            dataGen: dataGen.data
        })
    }

}
export function filterGames(payload) {
    return async function (dispatch){
        return dispatch({
            type: "FILTER_GAMES",
            payload
        })
    }

}

export function orderGames(payload) {
    return async function (dispatch){
        return dispatch({
            type: "ORDER_GAMES",
            payload
        })
    }
}

export function searchGames(payloadI){
    return async function (dispatch) {
        try {
            let axiosGetSearch = await axios.get(`http://localhost:3001/videogames?name=${payloadI}`)
            return dispatch({
                type: 'SEARCH',
                payload: axiosGetSearch.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export function searchGamesChange(payload){
    return {
        type:'SEARCH_ONCHANGE',
        payload
    }
}
export function detailsGame(payloadI){
   return async function(dispatch){
       const getDetails = await axios.get(`http://localhost:3001/videogame/${payloadI}`)
        return dispatch({
            type:'GET_DETAILS',
            payload: getDetails.data
        })
   }
}
export function postGames(payload){
    return async function(dispatch){
        try {
            const res = await axios.post('http://localhost:3001/videogames',payload)
            alert("CREACION CON EXITO")
        } catch (error) {
            alert("CREACION FALLIDA - DUPLICADO")
        }
    }
}
export function filterApi(payload){
    return{
        type:'FILTER_BY_APBD',
        payload
    }
}