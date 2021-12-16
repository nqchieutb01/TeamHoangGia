import React from 'react'
import Loading from './Loading'
import {useParams, Link} from 'react-router-dom'

export default function SingleLocation() {
    const {id} = useParams()
    // console.log(id)

    const [loading, setLoading] = React.useState(false)
    const [location, setLocation] = React.useState(null)


    React.useEffect(() => {
        setLoading(true)

        async function getLocation() {
            try {
                const response = await fetch(
                    `https://61af70223e2aba0017c49342.mockapi.io/getlocations/${id}`
                )
                const data = await response.json()
                // console.log(data)

                if (data) {
                    const {
                        name: name,
                        city: city,
                        address: address,
                        image: image,
                        price: price,
                        timeOpen: timeOpen,
                        TimeClose: TimeClose,

                    } = data
                    const newLocation = {
                        name,
                        address,
                        image,
                        price,
                        timeOpen,
                        TimeClose,
                    }
                    setLocation(newLocation)
                } else {
                    setLocation(null)
                }
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }

        getLocation()
    }, [id])
    if (loading) {
        console.log("ssss")
        return <Loading/>
    }
    if (!location) {
        console.log("aaaa")
        return <h2 className='section-title'>no location to display</h2>
    } else {
        console.log("bbbb")

        const {
            name,
            address,
            image,
            price,
            priceMaxPerson,
            timeOpen,
            TimeClose,
        } = location
        return (
            <section className='section location-section'>
                {/*<Link to='/' className='btn_c btn_c-primary'>*/}
                {/*    back home*/}
                {/*</Link>*/}
                <h2 className='section-title'>{name}</h2>
                <div className='drink'>
                    <img src={image} alt={name}></img>
                    <div className='drink-info'>
                        <p>
                            <span className='drink-data'>name :</span> {name}
                        </p>
                        <p>
                            <span className='drink-data'>address :</span> {address}
                        </p>
                        <p>
                            <span className='drink-data'>price :</span> {price}
                        </p>
                        <p>
                            <span className='drink-data'>timeOpen :</span> {timeOpen}
                        </p>
                        <p>
                            <span className='drink-data'>TimeClose :</span> {TimeClose}
                        </p>
                    </div>
                </div>
            </section>
        )
    }


}