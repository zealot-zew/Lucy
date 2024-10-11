import React from 'react'
import Button from '../components/button'
import { arrowRight } from '../assets/icons'
import { shoe8 } from '../assets/images'

const SuperQuality = () => {
  return (
    <>
    <section id="about-us" className='flex justify-between items-center max-lg:flex-col gap-10 w-full max-container'>
      <div className='flex flex-col flex-1 '>
      <h2 className='mt-10 font-palanquin text-4xl capitalize font-bold'>
          We Provide You
          <span className='text-coral-red'> Super</span>
          <br/>
          <span className='text-coral-red'>Quality </span>
          Shoes
        </h2>
        <p className='mt-4 lg:max-w-lg info-text'>
          Ensuring premium comfort and style, our meticulously crafted footwear
          is designed to elevate your experience, providing you with unmatched
          quality, innovation, and a touch of elegance.
        </p>
        <p className='mt-6 lg:max-w-lg info-text'>
          Our dedication to detail and excellence ensures your satisfaction
        </p>
        <div className='mt-11'>
          <Button label= "View Details"/>
        </div>
      </div>

      <div className='flex-1 flex justify-center items-center ' >
        <img src={shoe8} alt='Product shoe' width={520} height={572} className='object-contain'/>
      </div>


    </section>
    </>
  )
}

export default SuperQuality