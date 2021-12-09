import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from "../components/Tours";
import SearchForm from "../components/SearchForm";
import Search_element from "../search/monoSearch";
const url = 'https://course-api.com/react-tours-project'

export default function Location() {
    const [loading, setLoading] = useState(true)
    const [tours, setTours] = useState([])
    const [toursInCart , setToursInCart] = useState([])
    const removeTour = (id) => {
        const removeTour = tours.filter((tour) => tour.id === id)
        const newTours = tours.filter((tour) => tour.id !== id)
        setTours(newTours)
        setToursInCart([...toursInCart,removeTour])
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
                <Loading />
            </main>
        )
    }
    if (tours.length === 0) {
        return (
            <main>
                    <div className='title'>
                        <h2>no tours left</h2>
                        <button className='btn_c' onClick={() => fetchTours()}>
                            refresh
                        </button>
                    </div>
            </main>
        )
    }
    return (

                <main className='main-tour'>
                    <Tours tours={tours} removeTour={removeTour} />
                </main>

    )
}
