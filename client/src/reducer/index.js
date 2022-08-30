
const initialState = {
    videogames: [],
    gender: [],
    cGender:[],
    cVideogames: [],
    detailsVideoGame: [],
    platform : [],
    addPlatform: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_VIDEOGAMES':
            const platforms = action.payload.map( e => typeof e.platform === "string" ? e.platform : e.platform.map(el => el.platform.name))
            return {
                ...state,
                videogames: action.payload,
                cVideogames: action.payload,
                cGender: action.dataGen,
                gender: action.dataGen,
                platform: platforms
        }
        case 'FILTER_GAMES':
            const gamesAll = state.cVideogames
            const showGames = action.payload !== "all" ?
            gamesAll.filter(element => {
                const length = element.gender ? element.gender.length : element.generos.length
                for (let i = 0; i < length ; i++) {
                    const el = element.gender ? element.gender[i].name : element.generos[i].gender
                    if ( el === action.payload) {
                        return element
                    }
                }
            }) : gamesAll
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
        case 'GET_DETAILS':
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
        case 'FILTER_BY_APBD':
            const videogamesAllAPBD = state.videogames
            const filterAPBD = videogamesAllAPBD.filter(e => action.payload === 'BD' ? !e.api ? e : false : e.api )

            return{
                ...state,
                videogames : filterAPBD
        }
        default: return state
    }
}

export default rootReducer
