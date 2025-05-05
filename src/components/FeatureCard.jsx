import React from 'react'

const FeatureCard = ({ imgURL, label, subtext }) => {
  return (
    <div className='flex-1 sm:w-[280px] sm:min-w-[300px] w-full rounded-[20px] 
    shadow-3xl px-10 py-7 transform transition duration-300 hover:shadow-red-200
    dark:shadow-white-400
    '>
      <div className='w-11 h-11 flex justify-center items-center bg-coral-red rounded-full'>
        <img src={imgURL} alt={label} />
      </div>
      <h3 className='mt-5 font-palanquin text-3xl leading-normal font-bold dark:text-white'>{label}</h3>
      <p className='mt-3 break-words font-montserrat leading-normal text-slate-gray dark:text-white-400'>{subtext}</p>
    </div>
  )
}

export default FeatureCard