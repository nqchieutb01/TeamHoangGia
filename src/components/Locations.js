import React from 'react';
import Location from './Location';
import "./Location.css"

export default function Locations({ locations, removeLocation }) {
    return (
        <section>
            <div className="title">
                {/*<h2>our locations</h2>*/}
                {/*<div className="underline"></div>*/}
            </div>
            <div>
                {locations.map((location) => {
                    return <Location key={location.id} {...location} removeLocation={removeLocation} />;
                })}
            </div>
        </section>

    );
}
