import React from "react";
import "./home.css"
export default function Card ( { name, image, gender } ){
    let textGender = gender.map( e => typeof e === "object" ? e.name : e)
    let text = textGender.join(" - ")
    return (
        <div className="divCard">
            <div>
                <img src={image.image ? image.image : image.src} alt="imagen" />
            </div>
            <div>
                <h3>{name}</h3>
                <p>{text}</p>
            </div>
        </div>
    )
}