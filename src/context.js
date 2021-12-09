import React, {useState, useContext, useEffect} from 'react'
import {useCallback} from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()
const newurl = 'http://localhost:8080/locations/1'
const AppProvider = ({children}) => {
    const [auth, setAuth] = useState(true)
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('a')
    const [cocktails, setCocktails] = useState([])
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
            const res = await fetch(newurl)
            const data_test = await res.json()
            console.log(data_test)
            const response = await fetch(`${url}${searchTerm}`)
            const data = await response.json()
            // console.log(data);
            const {drinks} = data
            if (drinks) {
                const newCocktails = drinks.map((item) => {
                    const {
                        idDrink,
                        strDrink,
                        strDrinkThumb,
                        strAlcoholic,
                        strGlass,
                    } = item

                    return {
                        id: idDrink,
                        name: strDrink,
                        image: strDrinkThumb,
                        info: strAlcoholic,
                        glass: strGlass,
                    }
                })
                setCocktails(newCocktails)
            } else {
                setCocktails([])
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
                loading, cocktails, searchTerm, setSearchTerm, auth, setAuth
                , isModalOpen, openModal, closeModal
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
