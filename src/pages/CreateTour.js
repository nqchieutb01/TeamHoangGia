import React, {useEffect, useState} from "react";
import Loading from "./Loading";
import Locations from "../components/Locations";
import LocationsInCart from "../components/LocationsInCart";
import DetailsCreateTour from "../components/DetailsCreateTour";
import Search_element from "../search/monoSearch";
import LocatioService from '../services/location.service'

import {useSelector} from "react-redux";

// const url = 'https://61af70223e2aba0017c49342.mockapi.io/getlocations'

export default function CreateTour({userId }) {

    const [loading, setLoading] = useState(true)
    const [locations, setLocations] = useState([])
    const [LocationInCart, setLocationsInCart] = useState([])
    const [search, setSearch] = useState([])

    const addToCart = (id) => {
        console.log(locations)
        const removeLocation = locations.filter((location) => location.id === id)
        //const newLocations = locations.filter((location) => location.id !== id)
        const check = LocationInCart.filter((location) => location.id === id)
        //setLocations(newLocations)
        //console.log("asssss")
       // console.log(removeLocation)
        //console.log(removeLocation.length)
        if (check.length == 0)
            setLocationsInCart(LocationInCart.concat(removeLocation))
    }

    const removeItemInCart = (id) => {
        const item = LocationInCart.filter((item) => item.id === id)
        const newItems = LocationInCart.filter((item) => item.id !== id)
        setLocationsInCart(newItems)
        //setLocations(locations.concat(item))
    }

    const fetchLocations = async () => {
         setLoading(true)
         try {

             const response = await LocatioService.getAllLocations()
             setLoading(false)
             setLocations(response.data)
         } catch (error) {
             setLoading(false)
             console.log(error)
         }
     }
     const searchLocation = async () => {
         setLoading(true)
         try {

             const response = await LocatioService.searchLocation(search)
             setLoading(false)
             setLocations(response.data)
         } catch (error) {
             setLoading(false)
             console.log(error)
         }
     }

    useEffect(() => {
         fetchLocations()
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
            <div className="left_c"  >
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

                        <Locations locations={locations} removeLocation={addToCart}/>
                    </main>
                }
                </section>
            </div>
            <div className="right_c">
                <section className='section-center_c'>
                    <h2> menu component</h2>
                    <DetailsCreateTour userId={userId} locationsInCart={LocationInCart}/>
                </section>

            </div>
        </div>
    )
}