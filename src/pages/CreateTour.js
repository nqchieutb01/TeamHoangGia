import React, {useEffect, useState} from "react";
import Loading from "./Loading";
import Tours from "../components/Tours";
import ItemInCart from "../components/ItemInCart";
import ItemsInCart from "../components/ItemsInCart";
import ItemsssInCart from "../components/ItemsInCart";

const url = 'https://course-api.com/react-tours-project'

export default function CreateTour() {
    const [loading, setLoading] = useState(true)
    const [tours, setTours] = useState([])
    const [ItemsInCart, setItemsInCart] = useState([])

    const addToCart = (id) => {
        const removeTour = tours.filter((tour) => tour.id === id)
        const newTours = tours.filter((tour) => tour.id !== id)
        setTours(newTours)
        setItemsInCart(ItemsInCart.concat(removeTour))
    }

    const removeItemInCart = (id)=>{
        const item = ItemsInCart.filter((item)=> item.id ===id)
        const newItems = ItemsInCart.filter((item) => item.id !== id)
        setItemsInCart(newItems)
        setTours(tours.concat(item))
    }

    const fetchTours = async () => {
        setLoading(true)
        try {
            const response = await fetch(url)
            const tours = await response.json()
            setLoading(false)
            setTours(tours)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        fetchTours()
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
                {/*{ItemsInCart.map((tour) => {*/}
                {/*    return <ItemInCart key={tour.id} {...tour}  removeItem={removeItemInCart}/>;*/}
                {/*})}*/}
                <ItemsssInCart items={ItemsInCart} removeItem={removeItemInCart}/>
            </div>
            <div className="main_c">
                {tours.length === 0 ? <div className='title'>
                        <h2>no tours left</h2>
                        <button className='btn_c' onClick={() => fetchTours()}>
                            refresh
                        </button>
                    </div> :
                    <main className='main-tour'>
                        <Tours tours={tours} removeTour={addToCart}/>
                    </main>
                }

            </div>
            <div className="right_c">

            </div>
        </div>
    )
}