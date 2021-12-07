import React from 'react';
import Tour from './Tour';
import "./Tour.css"
import ItemInCart from "./ItemInCart";
const ItemsssInCart = ({ items, removeItem }) => {
    return (
        <section>
            <div className="title">
                <h2>Cart</h2>
                <div className="underline"></div>
            </div>
            <div>
                {items.map((item) => {
                    return <ItemInCart key={item.id} {...item} removeItem={removeItem} />;
                })}
            </div>
        </section>

    );
};

export default ItemsssInCart;