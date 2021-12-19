import React from 'react';
import Location from './Location';
export default function Locations({ locations, removeLocation,state }) {
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
