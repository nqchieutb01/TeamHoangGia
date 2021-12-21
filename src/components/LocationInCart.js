import React from 'react';
import "../css/Tour.css"
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function LocationInCart({ id, name, price, removeItem }){
    return (
        <div>
            <article className="single-tour">
                <footer>
                    <div className="tour-info">
                        <div>
                            <h5>{name}</h5>
                        </div>
                        <div>
                            <h5 className="tour-price">{price.toLocaleString()} VNĐ</h5>
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