import React from 'react'
import './landingPage.css'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { VideogamesAll } from "../actions"
import { useEffect } from "react"

function LandingPage() {
    const dispatch= useDispatch()
    useEffect(() => {
        dispatch(VideogamesAll());
    }, [dispatch])
  return (
 <div className="landingContainer">
        <div className="dvLanding">
        <div>
            <h1>Bienvenidos!</h1>
        </div>
        <div className="dvLanding">
            <Link to={"/home"}><button className="buttonLanding">Ingresar</button></Link>
        </div>
        </div>
    </div>
  )
}

export default LandingPage