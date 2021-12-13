import React from "react";

export default function Cards ({image, name, temperament, weight}){
    return (
        <div>
            <h3>{name}</h3>
            <h3>{temperament}</h3>
            <h3>{weight}</h3>
            <img src={image} alt='img not found' width='200px' height='250px' />
        </div>
    )
}