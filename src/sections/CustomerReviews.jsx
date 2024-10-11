import React from 'react'
import ReviewCard from '../components/ReviewCard'
import { reviews } from '../constants'

const CoustmerReviews = () => {

  return (
    <section className='max-container'>
      <h3 className='font-palanquin text-center text-4xl font-bold'>
        What our
        <span className='text-coral-red'> Customers </span>
        say?
      </h3>
      <p className='info-text m-auto mt-4 max-w-lg text-center'>Hear stories from our genuien customers who are very statisfied with the products.</p>
      <div className='mt-24 flex flex-1 justify-evenly items-center max-lg:flex-col gap-14'>
      {reviews.map((review, index) => (
          <ReviewCard
            key={index}
            imgURL={review.imgURL}
            customerName={review.customerName}
            rating={review.rating}
            feedback={review.feedback}
          />
        ))}
      </div>
    </section>
  )
}

export default CoustmerReviews