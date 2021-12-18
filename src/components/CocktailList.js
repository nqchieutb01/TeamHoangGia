import React from 'react'
import Cocktail from './Cocktail'
import Loading from '../pages/Loading'
import { useGlobalContext } from '../context'
import "../index.css"

export default function CocktailList() {
  const { cocktails, loading ,tours} = useGlobalContext()
    console.log('2-> ',tours)
  if (loading) {
    return <Loading/>
  }
  if (cocktails.length < 1) {
    return (
      <h2 className='section-title'>
        no cocktails matched your search criteria
      </h2>
    )
  }
  return (
    <section className='section'>
      <div className='cocktails-center'>
        {cocktails.map((item) => {
          return <Cocktail key={item.id} {...item} />
        })}
      </div>
    </section>
  )
}
