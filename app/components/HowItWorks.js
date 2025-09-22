'use client'
import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'
import gsap from 'gsap'
import { animateWithGsap } from '../utils/animations'
const HowItWorks = () => {

    const VideoRef = useRef();

    useGSAP(() => {
        gsap.from('#chip', {
            scrollTrigger: {
                trigger: '#chip',
                start: '20% bottom'

            },
            opacity: 0,
            scale: 2,
            duration: 2,
            ease: 'power2.inOut'
        })

        gsap.to('.g_fadeIn',{
            opacity:1,
            y:0,
        })
    }, []);

    // animateWithGsap('.g_fadeIn',{
    //     opacity:1,
    //     y:0,
    //     duration:1,
    //     ease:'power2.inOut'
        
    // })


    return (

        <section className='sm:py-32 py-20 sm:px-10 px-5'>
            <div className='max-w-screen'>
                <div id='chip' className='flex items-center justify-center w-full my-20'>
                    <img src={'/chip.jpeg'} alt='chip' width={180} height={180} />

                </div>
                <div className='flex flex-col items-center '>
                    <h2 className='text-4xl md:text-7xl font-semibold text-center'>
                        A17 Pro Chip.
                        <br />A monster win for gaming
                    </h2>
                    <p className='text-gray font-semibold text-xl md:text-2xl py-10 text-center'>
                        It`&apos;`s here. The Biggest redesign in the history of Apple GPUs.
                    </p>

                </div>
                <div className='mt-10 md:mt-20 mb-14'>
                    <div className='relative h-full flex items-center justify-center'>
                        <div className='overflow-hidden'>
                            <img
                                src={'/frame.png'}
                                alt='frame'
                                className='bg-transparent relative z-10'
                            />

                        </div>
                        <div className='absolute w-[95%] h-[90%] rounded-[56px] overflow-hidden'>
                            <video className='pointer-events-none' playsInline preload='none' muted autoPlay ref={VideoRef}>
                                <source src='/frame.mp4' type='video/mp4' />
                            </video>
                        </div>
                    </div>
                    <p className='text-gray-700 font-semibold text-center mt-3'>Honkai: Star Rail</p>
                    <div className='flex md:flex-row flex-col justify-between items-start gap-24' id='gtext'>
                        <div className='flex-1 flex flex-col justify-center' id='gtext'>
                            <p className=' text-gray text-xl font-normal md:font-semibold opacity-0 translate-y-[100px] g_fadeIn'>
                                A17 Pro is an entirely new class of iPhone chip that delivers our {' '}
                                <span className='text-white'>best graphic performance by far.</span>
                            </p>
                        
                        <p className='' id='gtext'>
                            Mobile{' '}
                            <span className='text-white'>games will look and feel so immersive</span>, when incredibly detailed environments and characters.
                        </p>

                    </div>
                    <div className='flex-1 flex justify-center flex-col opacity-0 translate-y-[100px] g_fadeIn'>
                        <p className='text-gray text-xl font-normal md:font-semibold'>New </p>
                        <p className='text-white text-3xl md:text-5xl font-normal md:font-semibold my-2'>Pro-class GPU</p>
                        <p className='text-gray text-xl font-normal md:font-semibold '>with 6 cores</p>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks
