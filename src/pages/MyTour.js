import React, {useState, useEffect} from 'react'
import Loading from './Loading'
import Button from "@mui/material/Button";

// const url = 'https://course-api.com/react-tours-project'
const url  = 'http://localhost:8080/locations/'
const delete_location = 'http://localhost:8080/locations/delete/'
const add_location = 'http://localhost:8080/locations/add'

const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        id: null,
        name: 'Chieunq',
        address: 'Thái Bình',
        image: null,
        priceMinPerPerson: null,
        priceMaxPerPerson: null,
        timeOpen: null,
        timeClose: null,
        type: null,
        createAt: '2021-12-09 21:30:48',
        updateAt: '2021-12-09 21:30:48'
    })
};

export default function MyTour() {
    const [loading, setLoading] = useState(true)
    const [tours, setTours] = useState([])

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

    const addLocation = async () => {
        try {
            const res_add_location = await fetch(add_location, requestOptions)
            fetchTours()
            // console.log(res_add_location.json())

        } catch (e) {
            console.log(e)
        }

    }
    async function deleteLocation(tour) {
        try {
            const res = await fetch(delete_location + tour.id, {method: "DELETE"})
            fetchTours()
            // return res.json()
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchTours()
    },[])

    if (loading) {
        return (
            <main>
                <Loading/>
            </main>
        )
    }
    // if (tours.length === 0) {
    //     return (
    //         <main>
    //             <div className='title'>
    //                 <h2>Mày không có tour nào , vào tạo đi</h2>
    //             </div>
    //         </main>
    //     )
    // }
    return (
        <>
            <Button onClick={addLocation}>
                Add Location
            </Button>
            <div className='main-tour'>

                {tours.map( (tour)=>{
                    return <article className="single-tour">
                        <h5>{tour.name}</h5>
                        <Button onClick={()=>deleteLocation(tour)}>Delete</Button>
                        {/*<DeleteIcon onClick={deleteLocation(tour.id)}/>*/}
                    </article>
                } )}
            </div>
        </>


    )
}
