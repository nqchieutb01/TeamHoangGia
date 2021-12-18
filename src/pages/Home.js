import React, {useEffect} from 'react'
import CocktailList from '../components/CocktailList'
import SearchForm from '../components/SearchForm'
import Search_element from "../search/monoSearch";
import {useGlobalContext} from "../context";
import RangeSlider from "../search/RangeSlider";
import HoverRating from "../search/Rating";

export default function Home() {
    const auth = useGlobalContext()

    useEffect(() => {
        console.log(auth.auth)
    }, [auth])

    if (auth.auth === false) {
        return <></>
    } else {
        return (
            <main>
                <div class="row_c">
                    {/*<div class="left_c">*/}
                    {/*    /!*<SearchForm/>*!/*/}
                    {/*</div>*/}
                    <div class="main_c_home">
                        {/*<MessageSender/>*/}
                        <CocktailList/>
                    </div>
                    <div class="right_c">
                        <section className='section-center_c'>
                            <Search_element input={'Name'}/>
                            <br/>
                            <Search_element input={'Location'}/>
                            <br/>
                            <h3>Giá</h3>
                            <RangeSlider/>
                            <br/>
                            <h3>Đánh giá</h3>
                            <HoverRating />
                        </section>
                    </div>
                </div>

            </main>
        )
    }
}
