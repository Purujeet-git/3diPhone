'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'
import { useRef } from 'react'
import { animateWithGsap } from '../utils/animations'

const Features = () => {
    const videoRef = useRef();

    useGSAP(() => {
        gsap.to('#exploreVideo', {
            
            scrollTrigger: {
                trigger: '#exploreVideo',
                toggleActions: 'play pause reverse restart',
                start: '-10% 85%',
                
            },
            onComplete: () => {
                videoRef.current.play();
            }
        })
        // gsap.to('#gtext',{
        //     opacity:1,
        //     y:0
        // })
        animateWithGsap('#features_title', { y: 0, opacity: 1 })
        animateWithGsap('.g_grow',
            { scale: 1, opacity: 1, ease: 'power1' },
            { scrub: 5.5 }
        )
        animateWithGsap('#gtext',
            { y: 0, opacity: 1, ease: 'power2.inOut', duration: 1 }
        )
    })
    return (
        <section className='h-full w-[98vw] sm:py-32 py-20 sm:px-10 px-5 bg-zinc-900 relative overflow-hidden '>
            <div className='max-w-screen '>
                <div className='mb-12 w-full'>
                    <h1 id='features_title' className='text-gray-400 lg:text-6xl md:text-5xl text-3xl lg:mb-0 mb-5 font-medium opacity-0 translate-y-20'>
                        Explore the full story.
                    </h1>
                </div>
                <div className='flex flex-col justify-center items-center overflow-hidden'>
                    <div className='mt-32 mb-24 pl-24'>
                        <h2 className='text-5xl lg:text-7xl font-semibold'>iPhone</h2>
                        <h2 className='text-5xl lg:text-7xl font-semibold'>Forged In Titanium</h2>
                    </div>
                    <div className='flex-col flex items-center justify-center sm:px-10'>
                        <div className='relative h-[50vh] w-full flex items-center'>
                            <video playsInline id='exploreVideo' className='w-full h-full object-cover object-center' preload='none' muted autoPlay ref={videoRef}>
                                <source src='/explore.mp4' type='video/mp4' />
                            </video>
                        </div>
                        <div className='flex flex-col w-full  relative'>
                            <div className='w-full flex flex-col md:flex-row gap-5 items-center'>
                                <div className='overflow-hidden flex-1 h-[30vh] '>
                                    <img src={'/explore1.jpg'} alt='titanium' className='w-full h-full object-cover object-center scale-150 opacity-0 g_grow' />
                                </div>
                                <div className='overflow-hidden flex-1 h-[30vh] '>
                                    <img src={'/explore2.jpg'} alt='titanium' className='w-full h-full object-cover object-center scale-150 opacity-0 g_grow' />
                                </div>
                            </div>
                            <div className='text-gray-500  text-lg md:text-xl font-semibold md:flex md:h-[40vh] w-full  translate-y-[100px]' id='gtext'>
                                <div className='flex-1 flex items-center justify-center'>
                                    <p className='text-gray-500 max-w-md text-lg md:text-xl font-semibold opacity-0 translate-y-[100px] ' id='gtext'>
                                        iPhone 15 Pro is {' '}
                                        <span className='text-white'>the first iPhone to feature an aeroSpace Titanium design</span>, using the same alloy that aircrafts use for Missions to Mars.
                                    </p>
                                </div>
                                <div className='flex-1 flex items-center justify-center'>
                                    <p className='text-gray-500 pt-20 md:pt-0  max-w-md text-lg md:text-xl font-semibold opacity-0 translate-y-[100px] ' id='gtext'>
                                        Titanium has one of the best strength-to-weight ratios of any metal, making these our {' '}
                                        <span className='text-white'>lightest Pro models ever.</span>You`&apos;`ll notice the difference the moment you pick one up.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features
