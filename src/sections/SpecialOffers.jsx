import React from 'react'
import { offer } from '../assets/images'
import Button from '../components/button'
import { arrowRight } from '../assets/icons'

const SpecialOffers = () => {
  return (
    <section className='flex justify-wrap items-center max-xl:flex-col-reverse gap-10 max-container'>
      <div className='flex-1'> 
        <img src={offer} alt=" Offer image 30%" height={687} width={773} className='object-contain'/>
      </div>
      <div className='flex flex-col flex-1 '>
      <h2 className='mt-10 font-palanquin text-4xl capitalize font-bold dark:text-white'>
          <span className='text-coral-red'>Special </span>
          Offer
        </h2>
        <p className='mt-4 lg:max-w-lg info-text dark:text-white-400'>
          Ensuring premium comfort and style, our meticulously crafted footwear
          is designed to elevate your experience, providing you with unmatched
          quality, innovation, and a touch of elegance.
        </p>
        <p className='mt-6 lg:max-w-lg info-text dark:text-white-400'>
          Our dedication to detail and excellence ensures your satisfaction
        </p>
        <div className='mt-11 flex flex-wrap gap-4'>
          <Button label= "Shop now" iconUrl={arrowRight}/>
          <Button label="Learn more" backgroundColor="bg-white" borderColor=" border-slate-gray" textColor="text-slate-gray"/>
        </div>
      </div>

    </section>
  )
}

export default SpecialOffers