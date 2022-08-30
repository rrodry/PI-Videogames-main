import React from "react";
import './home.css'
export default function Paginated( {cantPage, paginated } ){
    const pages = Math.ceil(cantPage)
    const arr = Array.from(Array(pages+1).keys())

    return (
        <nav className="navContainer">
            <ul>
                {
                    arr.map(e => {
                        return (
                            e !== 0 &&
                            <li key={e}>
                                <input key={e} type="button" onClick={() => paginated(e)} value={e}/>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}