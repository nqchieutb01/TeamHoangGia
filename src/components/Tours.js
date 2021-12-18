import React from 'react'
import Loading from '../pages/Loading'
import { useGlobalContext } from '../context'
import "../index.css"
import Tour from './Tour'
export default function Tours() {
    const { tours, loading } = useGlobalContext()
    // console.log('->2: ',tours)
    if (loading) {
        return <Loading/>
    }
    if (tours.length < 1) {
        return (
            <h2 className='section-title'>
                no cocktails matched your search criteria
            </h2>
        )
    }
    return (
        <section className='section'>
            <div className='cocktails-center'>
                {tours.map((item) => {
                    return <Tour key={item.id} {...item} />
                })}
            </div>
        </section>
    )
}
