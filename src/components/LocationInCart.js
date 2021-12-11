import React, { useState } from 'react';
import "./Tour_test.css"
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function LocationInCart({ locationId, name, city, priceMinPerson, priceMaxPerson, timeOpen, TimeClose, removeItem }){
    return (
        <div>
            <article className="single-tour">
                <footer>
                    <div className="tour-info">
                        <h5>{name}</h5>
                        <h5 className="tour-price">${priceMinPerson} ->$ {priceMaxPerson} </h5>

                    </div>

                    <button className="delete-btn" onClick={() => removeItem(locationId)}>
                        Remove
                        <RemoveCircleOutlineIcon style={{marginLeft:"10px"}}/>
                    </button>
                </footer>
            </article>
        </div>
    );
};
