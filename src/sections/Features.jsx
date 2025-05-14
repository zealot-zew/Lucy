import React from 'react'
import { features } from '../constants'
import FeatureCard from '../components/FeatureCard'

const Features = () => {
  return (
    <>
      <div className='max-container flex justify-center flex-wrap gap-9'>
        {features.map((feature) => (
          <FeatureCard key={feature.label}
            {...feature} />
        ))}
      </div>
    </>

  )
}

export default Features