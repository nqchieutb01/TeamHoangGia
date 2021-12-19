import React, {useEffect} from 'react'
import SearchElement from "../search/monoSearch";
import {useGlobalContext} from "../context";
import RangeSlider from "../search/RangeSlider";
import HoverRating from "../search/Rating";
import Tours from "../components/Tours";
import SearchV1 from "../components/Search";

export default function Home() {
    const auth = useGlobalContext()

    useEffect(() => {
        // console.log(auth.auth)
    }, [auth])

    if (auth.auth === false) {
        return <></>
    } else {
        return (
            <main>
                <div class="row_c">
                    <div class="left_c">
                        <section className='section-center_c'>
                              <SearchV1/>
                        </section>
                    </div>
                    <div class="main_c">
                        {/*<CocktailList/>*/}
                        <Tours/>
                    </div>
                    <div class="right_c">
                        <section className='section-center_c'>
                            <SearchElement input={'Name'}/>
                            <br/>
                            <SearchElement input={'Location'}/>
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
