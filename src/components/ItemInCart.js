import React, { useState } from 'react';
import "./Tour.css"
export default function ItemInCart({ id, image, info, name, price, removeItem }){
    return (
        <div>
            <article className="single-tour">
                <footer>
                    <div className="tour-info">
                        <h5>{name}</h5>
                        <h5 className="tour-price">${price}</h5>
                    </div>
                    {/*<p>*/}
                    {/*    {readMore ? info : `${info.substring(0, 200)}...`}*/}
                    {/*    <button onClick={() => setReadMore(!readMore)}>*/}
                    {/*        {readMore ? 'show less' : '  read more'}*/}
                    {/*    </button>*/}
                    {/*</p>*/}
                    <button className="delete-btn" onClick={() => removeItem(id)}>
                        Remove
                    </button>
                </footer>
            </article>
        </div>
    );
};
