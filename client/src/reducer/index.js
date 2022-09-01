const initialState = {
    videogames: [],
    gender: [],
    cGender:[],
    cVideogames: [],
    detailsVideoGame: {},
    platform : [],
    addPlatform: [],
    loading: true
}


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_VIDEOGAMES':
            
            const platform = [...new Set(action.payload.map( e => e.platform).flat())]

            return {
                ...state,
                videogames: action.payload,
                cVideogames: action.payload,
                cGender: action.dataGen,
                gender: action.dataGen,
                platform: platform
        }
        case 'FILTER_GAMES':
            const gamesAll = state.cVideogames
            const showGames = action.payload === "all" ? state.cVideogames : gamesAll.filter(e => e.genders.includes(action.payload))       
            return {
                ...state,
                videogames: showGames
        }
        case 'ORDER_GAMES':
            const cVideogames = state.videogames
            const sort = cVideogames.sort((a, b) => {
                if (action.payload === "asc" ) {
                    if (a.name > b.name) return 1
                    if (b.name > a.name) return -1
                    return 0
                }
                if (action.payload === "des") {
                    if (a.name > b.name) return -1
                    if (b.name > a.name) return 1
                    return 0                    
                }
                if (action.payload === "ascR") {
                    if (a.rating > b.rating) return -1
                    if (b.rating > a.rating) return 1
                    return 0
                }
                if (action.payload === "desR") {
                    if (a.rating > b.rating) return 1
                    if (b.rating > a.rating) return -1
                    return 0
                }
            })

            return {
                ...state,
                videogames: sort
        }
        case 'SEARCH':
        return {
            ...state,
            videogames: action.payload
        }
        case "GET_DETAILS":
            return {
                ...state,
                detailsVideoGame: action.payload
        }
        case 'SEARCH_ONCHANGE':
        const copySearchOn = state.cVideogames
        const filter = copySearchOn.filter( e => e.name.toLowerCase().includes(action.payload.toLowerCase()) )
        return {
            ...state,
            videogames: filter
        }
        case 'CREATE':
            return{
                ...state
        }
        case 'LOADING':
            return{
                ...state,
                loading: action.payload

        }
        case 'FILTER_BY_APBD':
            const videogamesAllAPBD = state.cVideogames
            const filterAPBD = action.payload=== "all" ? state.cVideogames : videogamesAllAPBD.filter(e => action.payload === 'BD' ? !e.api : e.api )

            return{
                ...state,
                videogames : filterAPBD
        }
        default: return state
    }
}

export default rootReducer
