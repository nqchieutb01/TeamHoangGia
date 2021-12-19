import React, {useState, useContext, useEffect} from 'react'
import SERVICE from './services/tour.service'
import {useCallback} from 'react'

const AppContext = React.createContext()

const AppProvider = ({children}) => {

    const initValue = {
        name: "",
        locationName: "",
        priceMin: "",
        priceMax: "",
        rating: 0
    }

    const [auth, setAuth] = useState(true)
    const [loading, setLoading] = useState(true)
    const [tours, setTours] = useState([])
    const [search, setSearch] = useState(initValue)
    const [isClick, setIsClick] = useState(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        setLoading(false)
        const res = SERVICE.searchTour(search).then((res) => {
            setTours(res.data.map((tourE) => {
                    const temp = Object.assign({}, tourE.tour);
                    const listImage = []
                    tourE.location.forEach(element => {
                        listImage.push(element.image)
                    })
                    temp['listImage'] = listImage
                    return temp;
                }
            ))
        }).catch((e) => console.log(e))

    }, [isClick])

    return (
        <AppContext.Provider
            value={{
                loading, auth, setAuth, tours, setTours, search, setSearch, isClick, setIsClick, initValue
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
// make sure use
export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider}
