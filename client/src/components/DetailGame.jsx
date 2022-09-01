import React from "react";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { detailsGame } from "../actions";
import {useHistory, Link, useParams} from "react-router-dom";
import './Detail.css'
export default function DetailPage(props){
    const {id} = useParams()
    const dispatch = useDispatch()
    const videoGamesAll = useSelector( (state) => state.detailsVideoGame)
    const history = useHistory()

    useEffect(()=>{
        dispatch(detailsGame(id))
    },[dispatch,id])
    console.log(videoGamesAll);
    return (
        <div className="containerDivPrin">
            <div>
                <div className="containerDetails">
                    <h1>{videoGamesAll.name}</h1>
                    <div className="dvNI">
                        <img src={videoGamesAll.src} />
                    </div>
                    <div>
                        <p>{videoGamesAll.genders?.map(e => e.gender + " - ")}</p>
                    </div>
                    <div>
                        {videoGamesAll.platform?.map(e => e + " - ")}
                    </div>
                    <div>
                        <p className="pD"> {videoGamesAll.description} </p>
                    </div>
                    <div>
                        <p className="pD"> Released: {videoGamesAll.dateLaunch} </p>
                        <p className="pD"> Rating: {videoGamesAll.rating} </p>
                    </div>
                </div>
            </div>
            <div>
                <Link to="/home">
                <button className="btnHomeDetails">Home</button>
                </Link>
            </div>
        </div>
    )
}