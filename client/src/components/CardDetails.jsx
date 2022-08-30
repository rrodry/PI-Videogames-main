import React from "react";

export default function CardDetails (props){
    const gender = props.props.gender?.map(e=>e.name)
    const platform = props.props.platform
    return( 
    <div>
        <h1>{props.props.name}</h1>
        <img src={props.props.image} alt="Imagen game" width={500} height="200"/>
        <p>{gender}</p>
        {props.props.descripcion}
        <p> Lanzamiento: {props.props.dateLaunch} </p>
        <p> Lanzamiento: {props.props.rating} </p>
        <p> Plataformas: {platform?.map(e => e.platform.name).join("-")} </p>

    </div>
)}