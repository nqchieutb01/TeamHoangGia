import React from 'react';
import "./Tour_test.css"
import ItemInCart from "./ItemInCart";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const ItemsssInCart = ({ items, removeItem }) => {
    return (
        <section>
            <div className="title">
                <div>

                    <h2>
                        <ShoppingCartIcon style={{color:"blue"}}/>  Cart</h2>
                </div>
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