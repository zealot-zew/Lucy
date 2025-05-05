import React from 'react'
import Button from '../components/Button'

const Subscribe = () => {
  return (
    <section id='contact-us' className='max-container flex justify-center items-center gap-10 max-lg:flex-col id="contact-us'>
      <h3 className='text-4xl leading-[68px] lg:max-w-md font-palanquin font-bold dark:text-white'>Let’s connect and bring
        <span className='text-coral-red'> Vision </span> to life!
      </h3>
      <div className='lg:max-w-[40%] flex max-sm:flex-col gap-5 p-2.5'>
        <div className='flex max-sm:justify-end items-center max-sm:w-full'> 
          <Button label="Contact Us" fullWidth/>
        </div>
      </div>
    </section>
  )
}

export default Subscribe
