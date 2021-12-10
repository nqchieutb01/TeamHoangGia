import React, { useState } from 'react';
import { Link } from 'react-router-dom'
// import "./Location.css"
import "../index.css"
import background from "../background.png"
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function Location ({ locationId, name, city, address, image, priceMinPerson, priceMaxPerson, timeOpen, TimeClose}) {
    return (
        <article className='locatoion'>
            <div className='img-container'>
                <img src={background} alt={name} />
            </div>
            <div className='cocktail-footer'>
                <h3>{name}</h3>
                <h4>{address}</h4>

                <Link to={`/location/${locationId}`} className='btn btn-primary btn-details'>
                    details
                </Link>


            </div>
        </article>
    );
}
