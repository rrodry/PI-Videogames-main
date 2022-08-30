import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { handleSearch ,handleSubmit} from "../module/module"
import "./home.css"
export default function SearchBar(){
    const disptach = useDispatch()
    const [payloadName, setPayloadName] = useState('')
    return <div className="search">
        <input className="inputSearch"type='text' placeholder="Search Game..." onChange={ e => handleSearch(e , setPayloadName,disptach)}/>
        <button type="submit" onClick={e => handleSubmit(e, disptach, payloadName)}> Search </button>
    </div>


}