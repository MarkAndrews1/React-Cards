import React from "react";

const Card = ({ name, img }) => {
    return <img 
        className="Card" 
        alt={name} 
        src={img} />
}

export default Card