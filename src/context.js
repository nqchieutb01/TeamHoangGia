import React, {useState, useContext, useEffect} from 'react'
import SERVICE from './services/tour.service'
import {useCallback} from 'react'

const AppContext = React.createContext()
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

const AppProvider = ({children}) => {

    const initValue = {
        name :"",
        locationName : "" ,
        priceMin: "",
        priceMax:"",
        rating:0
    }
    const [cocktails, setCocktails] = useState([])
    const [searchTerm, setSearchTerm] = useState('a')
    const [auth, setAuth] = useState(true)
    const [loading, setLoading] = useState(true)
    // const [cocktails, setCocktails] = useState([])
    const [tours , setTours] = useState([])
    const [search,setSearch] = useState(initValue)
    const [isClick,setIsClick] = useState(false)
    const fetchDrinks = useCallback(async () => {
        setLoading(true)
        try {
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

    // const fetchTour = async ()=>{
    //     await SERVICE.getAllTour().then((res) => {
    //         setTours(res.data.map((tourE) => {
    //                 const temp = Object.assign({}, tourE.tour);
    //                 // console.log(temp)
    //                 const listImage = []
    //                 tourE.location.forEach(element=>{
    //                     listImage.push(element.image)
    //                 })
    //                 temp['listImage'] =listImage
    //                 return temp;
    //             }
    //         ))
    //     }).catch((e) => console.log(e))
    // }

    // useEffect(async () => {
    //     await fetchDrinks()
    //     await fetchTour()
    //     console.log('tour 2',tours)
    // }, [searchTerm, fetchDrinks])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        await fetchDrinks()
        setLoading(false)
        // await fetchTour()
        const res = SERVICE.searchTour(search).then((res) => {
            setTours(res.data.map((tourE) => {
                    const temp = Object.assign({}, tourE.tour);
                    // console.log(temp)
                    const listImage = []
                    tourE.location.forEach(element=>{
                        listImage.push(element.image)
                    })
                    temp['listImage'] =listImage
                    return temp;
                }
            ))
        }).catch((e) => console.log(e))

    }, [isClick])
    // console.log('tours 2',tours)

    return (
        <AppContext.Provider
            value={{
                loading,auth, setAuth , tours , setTours,search,setSearch,isClick,setIsClick,initValue
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
