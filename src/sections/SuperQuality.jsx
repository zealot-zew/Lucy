import React from 'react'
import Button from '../components/Button'
import { aboutusimg } from '../assets/images'

const SuperQuality = () => {
  return (
    <>
      <section id="about-us" className='flex justify-between items-center max-lg:flex-col gap-10 w-full max-container'>
        <div className='flex flex-col flex-1 '>
          <h2 className='mt-10 font-palanquin text-4xl capitalize font-bold dark:text-white'>
            We Provide You
            <span className='text-coral-red'> Top</span>
            <br />
            <span className='text-coral-red'>Quality </span>
            Marketing Solutions
          </h2>
          <p className='mt-4 lg:max-w-lg info-text dark:text-white-400'>
            Delivering exceptional reach and engagement, our carefully crafted marketing strategies are designed to boost your brand's presence,
            connecting you with your audience and driving business growth.
          </p>
          <p className='mt-6 lg:max-w-lg info-text dark:text-white-400'>
            Our commitment to innovation and detail ensures that you achieve impactful results.
          </p>
          <div className='mt-11' id="contact-us">
            <Button label="Contact Us" />
          </div>
        </div>

        <div className='flex-1 flex justify-center items-center ' >
          <img src={aboutusimg} alt='Product shoe' width={520} height={572} className='object-contain' />
        </div>
      </section>
    </>
  )
}

export default SuperQuality