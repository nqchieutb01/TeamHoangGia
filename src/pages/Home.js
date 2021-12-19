import React, {useEffect} from 'react'
import {useGlobalContext} from "../context";
import Tours from "../components/Tours";
import SearchV1 from "../components/Search";

export default function Home() {
    const auth = useGlobalContext()

    useEffect(() => {
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
                        <Tours/>
                    </div>
                    <div class="right_c">
                    </div>
                </div>

            </main>
        )
    }
}
