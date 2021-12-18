import React, { useState } from 'react';
import "./Tour_test.css"
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function LocationInCart({ id, name, city, price, timeOpen, timeClose, removeItem }){
    return (
        <div>
            <article className="single-tour">
                <footer>
                    <div className="tour-info">
                        <div>
                            <h5>{name}</h5>
                        </div>
                        <div>
                            <h5 className="tour-price">{price} VNĐ</h5>
                        </div>
                    </div>

                    <button className="delete-btn" onClick={() => removeItem(id)}>
                        Xóa khỏi Tour
                        <RemoveCircleOutlineIcon style={{marginLeft:"10px"}}/>
                    </button>
                </footer>
            </article>
        </div>
    );
};