import React from 'react';
import "./Tour_test.css"
import LocationInCart from "./LocationInCart";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
export default function LocationsInCart ({ items, removeItem }){
    return (
        <section>
            <div className="title">
                <div>
                    <h4>
                        <AddLocationAltIcon style={{color:"blue"}}/>  Danh sách địa điểm</h4>
                </div>
                <div className="underline"></div>
            </div>
            <div>
                {items.map((item) => {
                    return <LocationInCart key={item.id} {...item} removeItem={removeItem} />;
                })}
            </div>
        </section>

    );
}