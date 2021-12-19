import React from 'react'
import Loading from './Loading'
import {useParams} from 'react-router-dom'
import SERVICE from '../services/location.service'
export default function SingleLocation() {
    const {id} = useParams()
    // console.log(id)

    const [loading, setLoading] = React.useState(false)
    const [location, setLocation] = React.useState(null)


    React.useEffect(() => {
        setLoading(true)
        async function getLocation() {
            try {
                const res = await SERVICE.getLocationId(id)
                // console.log('location:' ,res.data[0])
                const data = res.data[0]
                if (data) {
                    const newLocation = data
                    console.log(newLocation)
                    setLocation(newLocation)
                } else {
                    setLocation(null)
                }
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
        getLocation().then().catch((e)=>console.log(e))
    })

    if (loading) {
        return <Loading/>
    }
    if (!location) {
        return <h2 className='section-title'>no location to display</h2>
    } else {
        const {
            // id,
            name,
            address,
            image,
            price,
            timeOpen,
            timeClose,
            // createdAt,
            // updatedAt
        } = location
        return (
            <section className='cocktail-section'>
                <br/><br/><br/>
                <h2 className='section_c-title'>{name}</h2>
                <div className='drink'>
                    <img src={image} alt={name}></img>
                    <div className='drink-info'>
                        <p style={{textAlign:'left'}}>
                            <span className='drink-data'>name : </span> {name}
                        </p>
                        <p style={{textAlign:'left'}}>
                            <span className='drink-data'>address :</span> {address}
                        </p >
                        <p style={{textAlign:'left'}}>
                            <span className='drink-data'>price :</span> {price} VNĐ
                        </p>
                        <p style={{textAlign:'left'}}>
                            <span className='drink-data'>timeOpen :</span> {timeOpen}
                        </p>
                        <p style={{textAlign:'left'}}>
                            <span className='drink-data'>TimeClose :</span> {timeClose}
                        </p>
                    </div>
                </div>
            </section>
        )
    }


}