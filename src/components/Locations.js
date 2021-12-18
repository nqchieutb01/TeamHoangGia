import React from 'react';
import Location from './Location';
import "./Location.css"

export default function Locations({ locations, removeLocation,state }) {
    // console.log('as',state)
    return (
        <section>
            <div className="title">
            </div>
            {
                state === undefined ? (
                        <div>
                            {locations.map((location) => {
                                return <Location key={location.id} {...location} removeLocation={removeLocation} inCart={false} />;
                            })}
                        </div>
                ) :
                    (
                        <div>
                            {locations.map((location) => {
                                return <Location key={location.id} {...location} removeLocation={removeLocation} inCart={state.get(location.id)} />;
                            })}
                        </div>
                    )
            }

        </section>

    );
}
