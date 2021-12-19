import React from 'react'
import Loading from '../pages/Loading'
import { useGlobalContext } from '../context'
import "../css/share/index.css"
import Tour from './Tour'
export default function Tours() {
    const { tours, loading } = useGlobalContext()
    if (loading) {
        return <Loading/>
    }
    if (tours.length < 1) {
        return (
            <h2 className='section-title'>
               Không tìm thấy Tour nào !!!
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
