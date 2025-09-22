'use client'
import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'



const Hero = () => {
  const [videoSrc, setVideoSrc] = useState('hero.mp4');

  useEffect(() => {
    const handleResize = () => {if(window.innerWidth < 760){
      setVideoSrc('/smallHero.mp4');
    }else{
      setVideoSrc('/hero.mp4');
    }
  }

  handleResize();

  window.addEventListener('resize',handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  }
  },[]);


  useGSAP(() => {
    gsap.to('#hero',{
      opacity:1,
      delay:2,
    })

    gsap.to('#cta',{
      opacity:1,
      y:-50,
      delay:2,
      
    })


  },[])

  

  return (
    <section className='w-full h-[calc(100vh-60px)] bg-black relative'>
      <div className='h-5/6  w-full flex items-center justify-center flex-col '>
        <p id='hero' className='hero-title text-center font-semibold text-3xl text-gray-100 opacity-0 max-md:mb-10'>iPhone 15 pro</p>
        <div className='md:w-10/12 w-9/12 '>
          <video autoPlay muted playsInline={true} key={videoSrc}>
            <source src={videoSrc} type='video/mp4'/>
          </video>
        </div>
      </div>
      <div
        id='cta'
        className='flex flex-col items-center opacity-0 translate-y-20'
      >
        <Link href='#highlights' className='px-5 py-2 rounded-3xl bg-blue-400 my-5 hover:bg-transparent border border-transparent hover:border hover:text-blue-400 hover:border-blue-400'>Buy</Link>
        <p className='font-normal text-xl '>From $199/month or $999</p>
      </div>
    </section>
  )
}

export default Hero
