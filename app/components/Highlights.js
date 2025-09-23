'use client'
import { useGSAP } from '@gsap/react'
import React from 'react'
import gsap from 'gsap';
import VideoCarousel from './VideoCarousel';

const Highlights = () => {

  useGSAP(() => {
    gsap.to('#title',{
      opacity:1,
      y:0
    })
    gsap.to('.link',{
      opacity:1,
      y:0,
      duration:1,
      stagger:0.25,
    })
  },[])
  return (
    <section id='highlights' className='w-[98vw] overflow-hidden h-full sm:py-32 py-20 sm:px-10 px-5 bg-zinc-900'>
      <div className='screen-max-width'>
        <div className='mb-12 w-full md:flex  items-end justify-between'>
          <h1 id='title' className='#section-title text-gray lg:text-6xl md:text-5xl text-3xl lg:mb-0 mb-5 font-medium opacity-0 translate-y-20'>
              Get the Highlights.
          </h1>

          <div className='flex flex-wrap items-end gap-5'>
            <p className='link text-blue-400 hover:underline cursor-pointer flex items-center text-xl opacity-0 translate-y-20'>Watch the film
               <img src='/watch.svg' alt='watch'/>
            </p>
            <p className='link text-blue-400 hover:underline cursor-pointer flex items-center text-xl opacity-0 translate-y-20'>Watch the event
               <img src='/right.svg' alt='right'/>
            </p>

          </div>
        </div>
        <VideoCarousel/>
      </div>
    </section>
  )
}

export default Highlights
