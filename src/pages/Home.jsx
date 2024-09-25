import React from 'react'
import { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'
import Island from '../models/Island'
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import Plane from '../models/Plane'
import HomeInfo from '../components/HomeInfo'

import sakura from '../assets/sakura.mp3'
import { soundoff, soundon } from '../assets/icons'

const Home = () => {
  const audioRef = useRef(new Audio(sakura))
  audioRef.current.volume = 0.3
  audioRef.current.loop = true
  const [isRotating, setIsRotating] = useState(false)

  const [currentStage, setCurrentStage] = useState(1)
  const [isPlayingmusic, setIsPlayingmusic] = useState(false)

  useEffect(() => {
    if (isPlayingmusic) {
      audioRef.current.play()
    }

    return () => {
      audioRef.current.pause()
    }
  }, [isPlayingmusic])

  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if(window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return { screenScale, screenPosition, rotation };
  }

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;

    if(window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5]
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return { screenScale: screenScale, screenPosition: screenPosition };
  }

  const { screenScale: islandScale, screenPosition: islandPosition, rotation: islandRotation } = adjustIslandForScreenSize();
  
  const { screenScale: planeScale, screenPosition: planePosition } = adjustPlaneForScreenSize();
  

  return (
    <section className='w-full h-screen relative'>
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && <HomeInfo currentStage={currentStage}/>} 
      </div>

      <Canvas
        className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{ near: 0.1, far: 1000 }}>

        <Suspense fallback={<Loader />}>
          <directionalLight position={[10, 1, 11]} intensity={2}/>
          <ambientLight intensity={0.5} />
         
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000"  
          />

          <Bird />
          <Sky 
            isRotating={isRotating}
          />
          <Island
            scale={islandScale}
            position={islandPosition}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            isRotating={isRotating}
            scale={planeScale}
            position={planePosition}
            rotation={[0, 20, 0]}
          />
        </Suspense>

      </Canvas>
      <div className='absolute bottom-2 left-2'>
        <img
         src={!isPlayingmusic ? soundoff : soundon}
         alt="sound"
         className='w-12 h-12 cursor-pointer object-contain' 
         onClick={() => setIsPlayingmusic(!isPlayingmusic)}/>
      </div>
    </section>
  )
}


export default Home
