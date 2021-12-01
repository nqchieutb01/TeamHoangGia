import React, {useEffect} from 'react'
import CocktailList from '../components/CocktailList'
import SearchForm from '../components/SearchForm'
import Advertisement from '../components/Advertisement'
import Search from "../search/Search";
import monoSearch from "../search/monoSearch";
import MessageSender from "../components/MessageSender";
import Search_element from "../search/monoSearch";
import {useGlobalContext} from "../context";

export default function Home() {
    const auth = useGlobalContext()

    useEffect(()=>{
        console.log(auth.auth)
    },[auth])

    if (auth.auth===false){
        return <></>
    }
    else {
        return (
            <main>
                <div class="row_c">
                    <div class="left_c">
                        <SearchForm/>
                    </div>
                    <div class="main_c">
                        <MessageSender/>
                        <CocktailList/>
                    </div>
                    <div class="right_c">
                        <Search_element input={'Name'}/>
                        <Search_element input={'Place'}/>
                    </div>
                </div>

            </main>
        )
    }
}
