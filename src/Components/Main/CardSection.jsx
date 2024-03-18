import React from 'react'
import { CardData } from '../../assets/CardData'
import Card from './Card'
const CardSection = () => {
  return (
    <div>
        <div className='grid grid-cols-5 gap-2 pt-4 mb-10 '>
            {CardData.map((card)=>{
                return <div key={card.id}>
                    <Card id={card.id} name={card.name} status={card.status} image={card.image}/>
                </div>
            })}
        </div>
    </div>
  )
}

export default CardSection