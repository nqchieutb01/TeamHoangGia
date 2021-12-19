import React, { useState } from 'react';
import "../css/Tour.css"
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function ItemInCart({ id, image, info, name, price, removeItem }){
    return (
        <div>
            <article className="single-tour">
                <footer>
                    <div className="tour-info">
                        <h5>{name}</h5>
                        <h5 className="tour-price">${price}</h5>
                    </div>
                    <button className="delete-btn" onClick={() => removeItem(id)}>
                        Remove
                        <RemoveCircleOutlineIcon style={{marginLeft:"10px"}}/>
                    </button>
                </footer>
            </article>
        </div>
    );
};
