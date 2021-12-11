import React from 'react';
import "./Tour_test.css"
import LocationInCart from "./LocationInCart";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function LocationsInCart ({ items, removeItem }){
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
                    return <LocationInCart key={item.locationId} {...item} removeItem={removeItem} />;
                })}
            </div>
        </section>

    );
}