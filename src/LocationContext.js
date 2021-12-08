import React, {useState, useContext, useEffect} from 'react'
import {useCallback} from 'react'

const url = 'https://61af70223e2aba0017c49342.mockapi.io/getlocations'
const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [auth, setAuth] = useState(true)
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('a')
    const [locations, setLocations] = useState([])
    const [isModalOpen, setIsmodalOpen] = useState(false);

    const openModal = () => {
        setIsmodalOpen(true);
    }
    const closeModal = () => {
        setIsmodalOpen(false);
    }

    const fetchDrinks = useCallback(async () => {
        setLoading(true)
        try {
            const response = await fetch(`${url}${searchTerm}`)
            const data = await response.json()
            const {locates} = data
            if (locates) {
                const newLocations = locates.map((item) => {
                    const {
                        id,
                        name,
                        address,
                    } = item

                    return {
                        locationId: id,
                        name: name,
                        address: address,
                    }
                })
                setLocations(newLocations)
            } else {
                setLocations([])
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }, [searchTerm])

    useEffect(() => {
        fetchDrinks()
    }, [searchTerm, fetchDrinks])


    return (
        <AppContext.Provider
            value={{
                loading, locations, searchTerm, setSearchTerm, auth, setAuth
                , isModalOpen, openModal, closeModal
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
// make sure use
export const useGlobalContext1 = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider}
