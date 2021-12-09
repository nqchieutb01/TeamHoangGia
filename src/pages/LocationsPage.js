import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Locations from "../components/Locations";
import Search_element from "../search/monoSearch";
const url = 'https://61af70223e2aba0017c49342.mockapi.io/getlocations'

export default function LocationsPage() {
    const [loading, setLoading] = useState(true)
    const [locations, setLocations] = useState([])

    const removeLocation = (id) => {
        const newLocations = locations.filter((location) => location.id !== id)
        setLocations(newLocations)
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
        fetchLocations()
    }, [])
    if (loading) {
        return (
            <main>
                <Loading />
            </main>
        )
    }
    if (locations.length === 0) {
        return (
            <main>
                <div className='title'>
                    <h2>no locations left</h2>
                    <button className='btn' onClick={() => fetchLocations()}>
                        refresh
                    </button>
                </div>
            </main>

        )
    }
    return (
        <main className='main-tour'>
            <Search_element input={"Chieu"}/>
            <Locations locations={locations} removeLocation={removeLocation} />
        </main>
    )
}
