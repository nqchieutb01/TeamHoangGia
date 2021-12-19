import React, {useEffect, useState} from "react";
import Loading from "./Loading";
import Locations from "../components/Locations";
import LocationsInCart from "../components/LocationsInCart";
import DetailsCreateTour from "../components/DetailsCreateTour";
import LocationService from '../services/location.service'

export default function CreateTour({userId}) {

    const [loading, setLoading] = useState(true)
    const [locations, setLocations] = useState([])
    const [LocationInCart, setLocationsInCart] = useState([])
    const [search, setSearch] = useState([])
    const [state, setState] = useState(new Map())

    const addToCart = (id) => {
        const removeLocation = locations.filter((location) => location.id === id)
        const check = LocationInCart.filter((location) => location.id === id)
        state.set(id, true)
        if (check.length === 0) {
            setLocationsInCart(LocationInCart.concat(removeLocation))
        }
    }

    const removeItemInCart = (id) => {
        const item = LocationInCart.filter((item) => item.id === id)
        const newItems = LocationInCart.filter((item) => item.id !== id)
        setLocationsInCart(newItems)
        state.set(id, false)
    }

    const searchLocation = async () => {
        setLoading(true)
        try {
            const response = await LocationService.searchLocation(search)
            setLoading(false)
            setLocations(response.data)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    useEffect(async () => {
        setLoading(true)
        try {
            LocationService.getAllLocations().then((response) => {
                setLoading(false)
                setLocations(response.data)
                const tmp_state = new Map()
                for (let i = 0; i < response.data.length; i++) {
                    tmp_state.set(response.data[i].id, false)
                }
                setState(tmp_state)
            }).catch((e) => console.log(e))

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }, [])

    if (loading) {
        return (
            <main>
                <Loading/>
            </main>
        )
    }

    return (
        <div className="row_c">
            <div className="left_c">
                <LocationsInCart items={LocationInCart} removeItem={removeItemInCart}/>
            </div>
            <div className="main_c">

                <section className='section-center_c'>

                    {locations.length === 0 ?
                        <div className='title'>

                            <div className='form-control_c'>
                                <input
                                    type='text'
                                    className='grocery_c'
                                    placeholder={search}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <button type='submit' className='submit-btn_c' onClick={searchLocation}>
                                    submit
                                </button>
                            </div>
                            <h2>no locations left</h2>

                        </div> :
                        <main className='main-tour'>
                            <h6> Tìm kiếm</h6>
                            <div className='underline'></div>
                            <div className='form-control_c'>
                                <input
                                    type='text'
                                    className='grocery_c'
                                    placeholder={search}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <button type='submit' className='submit-btn_c' onClick={searchLocation}>
                                    Tìm kiếm
                                </button>
                            </div>

                            <Locations locations={locations} removeLocation={addToCart} state={state}/>
                        </main>
                    }
                </section>
            </div>
            <div className="right_c">
                <section className='section-center_c'>

                    <br/>
                    <DetailsCreateTour userId={userId} locationsInCart={LocationInCart}/>
                </section>

            </div>
        </div>
    )
}