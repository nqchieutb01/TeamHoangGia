import React, {useEffect, useState} from "react";
import Loading from "./Loading";
import Locations from "../components/Locations";
import LocationsInCart from "../components/LocationsInCart";
import DetailsCreateTour from "../components/DetailsCreateTour";
import Search_element from "../search/monoSearch";
import Location from "../components/Location";
import ChienCoi from '../services/user.service'

const url = 'https://61af70223e2aba0017c49342.mockapi.io/getlocations'

export default function CreateTour({userId }) {

    const [loading, setLoading] = useState(true)
    const [locations, setLocations] = useState([])
    const [LocationInCart, setLocationsInCart] = useState([])

    const addToCart = (id) => {
        const removeLocation = locations.filter((location) => location.id === id)
        const newLocations = locations.filter((location) => location.id !== id)
        setLocations(newLocations)
        setLocationsInCart(LocationInCart.concat(removeLocation))
    }

    const removeItemInCart = (id) => {
        const item = LocationInCart.filter((item) => item.id === id)
        const newItems = LocationInCart.filter((item) => item.id !== id)
        setLocationsInCart(newItems)
        setLocations(locations.concat(item))
    }

    const fetchLocations = async () => {
        setLoading(true)
        try {
            const response = await fetch(url)
            const locations = await response.json()
            setLoading(false)
            setLocations(locations)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        // fetchLocations()
        setLoading(true)
        ChienCoi.getPublicContent().then(
            (res) =>{
                // console.log(res.data)
                setLoading(false)
                setLocations(res.data)
            }
        ).catch((e)=>console.log(e))
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
                        <h2>no locations left</h2>
                        <button className='btn_c' onClick={() => fetchLocations()}>
                            refresh
                        </button>
                    </div> :
                    <main className='main-tour'>
                        <Search_element input= {""}/>
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