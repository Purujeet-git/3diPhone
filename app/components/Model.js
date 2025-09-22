'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import React, { useState, useRef } from 'react'
import ModelView from './ModelView';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { View } from '@react-three/drei';
import { models, sizes } from '../constants';

const Model = () => {
    const [size, setSize] = useState('small');
    const [model, setModel] = useState({
        title: "iPhone 15 pro in Natural Titanium ",
        color: ["#8F8A81", '#FFE789', "#6F6C64"],
        img: '/yellow.jpg',
    })

    // Refs for the controls and 3D models
    const cameraControlSmall = useRef();
    const cameraControlLarge = useRef();
    const small = useRef(new THREE.Group());
    const large = useRef(new THREE.Group());

    // ✅ STEP 1: Create only ONE ref for the single viewport div
    const viewRef = useRef();

    const [smallRotation, setSmallRotation] = useState(0);
    const [largeRotation, setLargeRotation] = useState(0);

    useGSAP(() => {
        gsap.to('#heading', { opacity: 1, y: 0 })
    }, []);

    return (
        <section className='sm:py-32 py-20 sm:px-10 px-5'>
            <div className='max-w-screen'>
                <h1 id='heading' className='text-gray-700 lg:text-6xl md:text-5xl text-3xl lg:mb-0 mb-5 font-medium opacity-0 translate-y-20'>
                    Take a closer look.
                </h1>

                <div className='flex flex-col items-center mt-5'>
                    <div className='w-full h-[75vh] md:h-[90vh] overflow-hidden relative'>
                        {/* ✅ STEP 2: Create only ONE div to act as the "window" for your canvas */}
                        <div ref={viewRef} className="w-full h-full" />

                        <Canvas
                            className="w-full h-full"
                            style={{
                                position: 'absolute',
                                
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                overflow: 'hidden'
                            }}
                            eventSource={document.getElementById('root')}
                        >
                            <View.Port />

                            {/* ✅ STEP 3: Use your 'size' state to conditionally render the correct ModelView */}
                            {/* Both views will now correctly track to the same div */}
                            {size === 'small' ? (
                                <ModelView
                                    track={viewRef}
                                    index={1}
                                    groupRef={small}
                                    gsapType='view1'
                                    controlRef={cameraControlSmall}
                                    setRotationState={setSmallRotation}
                                    item={model}
                                    size={size}
                                />
                            ) : (
                                <ModelView
                                    track={viewRef}
                                    index={2}
                                    groupRef={large}
                                    gsapType='view2'
                                    controlRef={cameraControlLarge}
                                    setRotationState={setLargeRotation}
                                    item={model}
                                    size={size}
                                />
                            )}
                        </Canvas>
                    </div>

                    <div className='mx-auto w-full '>
                        <p className='text-sm font-light text-center mb-10'>{model.title}</p>
                        <div className='flex items-center justify-center'>
                            <ul className='flex items-center justify-center px-4 py-4 rounded-full bg-gray-900 backdrop-blur'>
                                {models.map((item, i) => (
                                    <li key={i} className='w-6 h-6 rounded-full mx-2 cursor-pointer' style={{
                                        backgroundColor: item.color[0]
                                    }} onClick={() => setModel(item)} />
                                ))}
                            </ul>
                            <button className='flex items-center justify-center p-1 rounded-full bg-gray-900 backdrop-blur ml-3 gap-1'>
                                {sizes.map(({ label, value }) => (
                                    <span key={label} className='w-10 h-10 text-sm flex justify-center items-center bg-white text-black rounded-full transition-all'
                                        style={{ backgroundColor: size === value ? 'white' : 'transparent', color: size === value ? 'black' : 'white' }}
                                        onClick={() => setSize(value)}>
                                        {label}
                                    </span>
                                ))}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Model;