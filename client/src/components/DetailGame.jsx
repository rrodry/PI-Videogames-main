import React from "react";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { detailsGame } from "../actions";
import CardDetails from './CardDetails'

export default function DetailPage(props){
    const {id} = props.match.params
    const disptach = useDispatch()    
    useEffect(()=>{
        disptach(detailsGame(id))
    },[])
    const videoGamesAll = useSelector( (state) => state.detailsVideoGame)
    if( videoGamesAll ){
        return (
            <div>
                <div>
                    {<CardDetails props = {videoGamesAll} />}
                </div>
            </div>
            )
    }
}