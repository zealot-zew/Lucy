import React from 'react'
import { star } from '../assets/icons'

const ReviewCard = ({customerName, feedback, rating, imgURL}) => {
  return (
    <>
      <div className='flex justify-center items-center flex-col'>
          <img src={imgURL} alt="Picture" className='rounded-full w-[120px] h-[120px]'/>
          <p className='mt-6 info-text text-center max-w-sm dark:text-white'>{feedback}</p>
          <div className='mt-3 flex justify-center items-center gap-2.5'>
            <img src={star} alt='rating star' height={24} width={24} className='object-contain'/>
            <p className='text-xl font-montserrat text-slate-gray dark:text-white-400'>({rating})</p>
          </div>
          <h3 className='mt-1 font-palanquin font-bold text-3xl text-center dark:text-white'>{customerName}</h3>

      </div>
    </>
  )

}

export default ReviewCard