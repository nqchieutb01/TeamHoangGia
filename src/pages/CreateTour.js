import React, {useEffect, useState} from "react";
import Loading from "./Loading";
import Locations from "../components/Locations";
import ItemsssInCart from "../components/ItemsInCart";
import DetailsCreateTour from "../components/DetailsCreateTour";
import Search_element from "../search/monoSearch";

//const url = 'https://course-api.com/react-tours-project'
const url = 'https://61af70223e2aba0017c49342.mockapi.io/getlocations'


export default function CreateTour() {
    const [loading, setLoading] = useState(true)
    const [locations, setLocations] = useState([])
    const [ItemsInCart, setItemsInCart] = useState([])

    const addToCart = (id) => {
        const removeLocation = locations.filter((location) => location.id === id)
        const newLocations = locations.filter((location) => location.id !== id)
        setLocations(newLocations)
        setItemsInCart(ItemsInCart.concat(removeLocation))
    }

    const removeItemInCart = (id) => {
        const item = ItemsInCart.filter((item) => item.id === id)
        const newItems = ItemsInCart.filter((item) => item.id !== id)
        setItemsInCart(newItems)
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
    console.log(locations)

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
    /*
    return  (
        <div> sss </div>
    )

     */
    return (
        <div className="row_c">
            <div className="left_c">
                <ItemsssInCart items={ItemsInCart} removeItem={removeItemInCart}/>
            </div>
            <div className="main_c">
                {locations.length === 0 ?
                    <div className='title'>
                        <h2>no locations left</h2>
                        <button className='btn_c' onClick={() => fetchLocations()}>
                            refresh
                        </button>
                    </div> :
                    <main className='main-location'>
                        <Search_element input={"Chieu"}/>
                        <Locations locations={locations} removeTour={addToCart}/>

                    </main>
                }

            </div>
            <div className="right_c">
                <h2> menu component</h2>
                <DetailsCreateTour/>
            </div>
        </div>
    )
    /*
    return (
        <div className="row_c">
            <div className="left_c">
                <ItemsssInCart items={ItemsInCart} removeItem={removeItemInCart}/>
            </div>
            <div className="main_c">
                {locations.length === 0 ?
                    <div className='title'>
                        <h2>no locations left</h2>
                        <button className='btn_c' onClick={() => fetchLocations()}>
                            refresh
                        </button>
                    </div> :
                    <main className='main-location'>
                        <Search_element input={"Chieu"}/>
                        <Locations tours={locations} removeTour={addToCart}/>
                    </main>
                }

            </div>
            <div className="right_c">
                <h2> menu component</h2>
                <DetailsCreateTour/>
            </div>
        </div>
    )

     */
}