import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { handleLoading, VideogamesAll } from "../actions"
import { handleFilterGames, handleOrderGames, handleAPBD, handleLoadAll } from "../module/module"
import "./body.css"
import Card from "./Card"
import Paginated from "./Paginated"
import Search from './Search'
import Loader from './Loader'

export default function Home() {
    const dispatch = useDispatch()
    const [filterOrder, setOrderFilter] = useState('')
    const videogamesGet = useSelector((state) => state.videogames)
    const generosGet = useSelector((state) => state.gender)
    const loading = useSelector((state) => state.loading)
    const [currenteGamePage, setCurrenteGame] = useState(1)
    const [gamesPage, setPage] = useState(15)
    
    const lastGame = currenteGamePage * gamesPage // 15
    const firstGame = lastGame - gamesPage // 15 - 15 = 0
    const gameCurrent = videogamesGet.slice(firstGame, lastGame) // [0 - 14]
    const paginated = (numerGamePage) => {
        setCurrenteGame(numerGamePage)
    }
    useEffect(() => {
        dispatch(VideogamesAll()).then(()=>dispatch(handleLoading(false)))
    }, [dispatch])
    return (
        <div> 
        {loading ? <Loader /> :
        <div className="divContainer" >
            <div className="buttonsDiv">
                <Link to='/createGame'>
                    <button> Create Game </button>
                </Link>
                    <button onClick={() => handleLoadAll(dispatch)}> Load all games </button>
                <Search/>
            </div>
            <div className="main">
                <div className="filterContainer">
                    <div className="filterSelects">
                        <select  onChange={e => handleFilterGames(e, dispatch)}>
                            <option defaultValue value="all"> All Games</option>
                            {generosGet.map(e => {
                                return <option key={e.id} value={e.gender}> {e.gender}</option>
                            })}
                        </select>
                    </div>
                    <div className="filterSelects">
                        <select  onChange={e => handleAPBD(e, dispatch)}>
                            <option defaultValue value="all">Filter on API or BD</option>
                            <option value="Api"> Game on API </option>
                            <option value="BD"> Game on BD</option>
                        </select>
                    </div>
                    <div className="filterSelects">
                        <select onChange={e => handleOrderGames(e, dispatch, setCurrenteGame, setOrderFilter)} >
                            <option defaultValue>Filter</option>
                            <option value="asc">Ascending Alphabetically</option>
                            <option value="des">Descending Alphabetically</option>
                            <option value="ascR">Ascending Rating</option>
                            <option value="desR">Descending Rating</option>
                        </select>
                    </div>
                </div>
                <div className="paginatedContainer">
                        <Paginated cantPage={videogamesGet.length / gamesPage} paginated={paginated} />
                </div>
                <div className="divCardContainer">{
                    gameCurrent?.map(e => {
                        return (
                            <Link to={`/details/${e.id}`} key={e.id}>
                               { <Card name={e.name} image={e} genders={e.genders} />}
                            </Link>
                        )
                    }) }
                    </div>
                </div>
            </div>
                } 
        </div>
                
    )
    
}