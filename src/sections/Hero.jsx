import React from 'react'
import Button from '../components/Button'
import { aboutusimg } from '../assets/images'

const Hero = () => {
  return (
    <>
      <section
        id="about-us"
        className="flex flex-wrap lg:flex-nowrap justify-between items-center gap-10 w-full px-6 py-12 max-container"
      >
        {/* Text Content + Search */}
        <div className="flex flex-col flex-1 max-w-xl">
          <h2 className="font-palanquin text-4xl capitalize font-bold dark:text-white mb-6 text-center">
            Welcome To <span className="text-coral-red">LUCY AI</span>
          </h2>
          <br></br>

          {/* Search Bar Below Heading */}
          <div className="relative w-full">
            <input
              type="search"
              className="h-[53px] w-full bg-[#ff6452] text-white placeholder-white px-6 pr-[130px] rounded-full outline-none appearance-none [&::-webkit-search-cancel-button]:appearance-none"
              placeholder="Enter a prompt"
            />
            <button className="absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center justify-center gap-2 px-4 py-1 text-[#ff6452] font-bold text-[15px] border-[3px] border-white/30 rounded-full bg-white shadow-[0px_5px_10px_rgba(0,0,0,0.2)] overflow-hidden cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:border-white/60 group text-nowrap">
              Try it
              <span className="absolute top-0 left-[-100px] w-[100px] h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-60 animate-shine"></span>
            </button>
          </div>
        </div>

        {/* Image Content */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={aboutusimg}
            alt="Lucy AI Illustration"
            width={520}
            height={572}
            className="object-contain"
          />
        </div>
      </section>


    </>
  )
}

export default Hero