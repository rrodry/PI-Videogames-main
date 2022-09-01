import React from "react";
import "./home.css"
export default function Card ( { name, image, genders } ){
    return (
        <div className="divCard">
            <div>
                <img src={image.image ? image.image : image.src} alt="imagen" />
            </div>
            <div>
                <h3>{name}</h3>
                { <p>{genders.join("-")}</p> }
            </div>
        </div>
    )
}