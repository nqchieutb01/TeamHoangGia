import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import "./Tour_test.css"
// import "./Location.css"
import "../index.css"
import background from "../background.png"
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

export default function Location ({ id, name, address, image, priceMinPerson, priceMaxPerson, timeOpen, TimeClose, removeLocation}) {
    if (removeLocation) {
        return (
            <article className='single-tour'>
                <div className='img-container'>
                    {
                        (image !== '') ? <img src={image} alt={name} style={{objectFit: "fill"}}/> :
                            <img src={background} alt={name} style={{objectFit: "fill"}}/>
                    }
                </div>
                <div className='cocktail-footer'>
                    <h3>{id}</h3>
                    <h3>{name}</h3>
                    <h4>{address}</h4>

                    <Link to={`/location/${id}`} className='btn btn-primary btn-details'>
                        details
                    </Link>

                    <button className="delete-btn" onClick={() => removeLocation(id)}>
                        Add To Cart
                        <AddCircleIcon style={{marginLeft: "15px"}}/>
                    </button>

                </div>
            </article>
        );
    }
    else {
        return (
            <article className='single-tour'>
                <div className='img-container'>
                    {
                        (image !== '') ? <img src={image} alt={name} style={{objectFit: "fill"}}/> :
                                 <img src={background} alt={name} style={{objectFit: "fill"}} />
                    }
                </div>
                <div className='cocktail-footer'>
                    <h3>{id}</h3>
                    <h3>{name}</h3>
                    <h4>{address}</h4>
                    <Link to={`/location/${id}`} className='btn btn-primary btn-details'>
                        details
                    </Link>
                </div>
            </article>
        );
    }
}