import { useRef, useEffect } from 'react'

import birdScene from '../assets/3d/bird.glb'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const Bird = () => {
    const birdRef = useRef()
    const { scene, animations } = useGLTF(birdScene)
    const { actions } = useAnimations(animations, birdRef)

    useEffect(() => {
        actions['Take 001'].play()
    }, [])

    useFrame((clock, camera)=>{
        birdRef.current.position.y = 0.5 * Math.sin(clock.elapsedTime) * 0.2 + 2

        if (birdRef.current.rotation.y === 0) {
            birdRef.current.rotation.x += 0.01
            birdRef.current.rotation.z -= 0.01
        } else {
            birdRef.current.rotation.x -= 0.01
            birdRef.current.rotation.z += 0.01
        }
    })
  return (
    <mesh 
    position={[5, 0, 0]} 
    rotation={[0, 0, 0]} scale={[1, 1, 1]} 
    ref={birdRef}>
     <primitive object={scene} />  
    </mesh>
  )
}

export default Bird