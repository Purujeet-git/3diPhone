import { OrbitControls, PerspectiveCamera, View } from '@react-three/drei'
import React, { Suspense } from 'react'
import * as THREE from 'three'
import Lights from './Lights';
import Iphone from './Iphone';

// Make sure to pass setRotationState as a prop if you need it
const ModelView = ({ 
  index, 
  groupRef, 
  gsapType, 
  controlRef, 
  setRotationState, 
  size, 
  item,
  track 
}) => {
  return (
    <group>
      <ambientLight intensity={0.3} />
      
      <Lights />

      <OrbitControls
       makeDefault
       ref={controlRef}
       enableZoom={false}
       enablePan={false}
       rotateSpeed={0.4}
       target={new THREE.Vector3(0,0,0)}
       
      />
      
      <group 
        ref={groupRef} 
        name={index === 1 ? 'small' : 'large'} 
        position={[0, 0, 0]}
        onPointerMove={(e) => {
          // Simple rotation based on mouse movement
          if (groupRef.current) {
            const x = (e.clientX / window.innerWidth - 0.5) * 2
            const y = (e.clientY / window.innerHeight - 0.5) * 2
            groupRef.current.rotation.y = x * 0.5
            groupRef.current.rotation.x = y * 0.3
          }
        }}
      >
        <Suspense fallback={null}>
          <Iphone
            scale={index === 1 ? [25, 25, 25] : [28, 28, 28 ]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </group>
  )
}
export default ModelView