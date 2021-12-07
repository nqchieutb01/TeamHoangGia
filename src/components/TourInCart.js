import React, { useState } from 'react';
import "./Tour.css"
const TourInCart = ({ id, image, info, name, price, removeTour }) => {
    const [readMore, setReadMore] = useState(false);
    return (
        <div>
            <h3>Cart</h3>
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
                <button className="delete-btn" onClick={() => removeTour(id)}>
                    Remove
                </button>
            </footer>
        </article>
        </div>
    );
};

export default TourInCart;