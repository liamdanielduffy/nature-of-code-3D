'use client'
import { Dog } from '@/components/canvas/Examples'
import { loadView } from '@/components/canvas/View'
import dynamic from 'next/dynamic'
import { Suspense, useState } from 'react'

const View = loadView()
const Common = dynamic<any>(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  BufferGeometry,
  Material,
  MeshStandardMaterial,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
  BoxGeometry,
} from 'three'
import { useGLTF } from '@react-three/drei'

const Voxel = () => {
  const voxelRef = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>()
  // const trailRef = useRef([])
  const { scene } = useThree()
  const { scene: dog } = useGLTF('/dog.glb')

  useFrame(() => {
    // Obtain the current position of the voxel
    if (voxelRef.current) {
      const currentPosition = voxelRef.current.position.clone()

      // Generate a random value between -1 and 1 for each axis
      const randomX = Math.random() * 2 - 1
      const randomY = Math.random() * 2 - 1
      const randomZ = Math.random() * 2 - 1

      // Update the voxel's position based on the random values
      voxelRef.current.position.set(
        currentPosition.x + randomX,
        currentPosition.y + randomY,
        currentPosition.z + randomZ,
      )

      // Create a mesh for the current position
      const trailMesh = dog.clone()
      trailMesh.position.copy(currentPosition)
      scene.add(trailMesh)
    }

    // Store the trail mesh in the trail ref
    // trailRef.current.push(trailMesh)
  })

  return (
    <mesh ref={voxelRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color='blue' />
    </mesh>
  )
}

const RandomWalk = () => {
  return <Voxel />
}

function DogWalkView() {
  const [isFullScreen, setFullScreen] = useState(false)

  const toggleFullScreen = () => {
    setFullScreen(!isFullScreen)
  }

  return (
    <>
      <div
        className={`${isFullScreen ? 'absolute inset-0 z-50 h-screen w-screen' : 'h-64 w-64'}`}
        style={{ transform: isFullScreen ? 'none' : '' }}
      >
        <div className={`relative h-full w-full ${isFullScreen ? 'z-50' : ''}`}>
          <View orbit className={`h-full w-full ${isFullScreen ?? 'z-50'}`}>
            <Suspense fallback={null}>
              <RandomWalk />
              <Common color={'lightpink'} />
            </Suspense>
          </View>
          <button className={'absolute left-0 top-0 z-40 m-2 rounded bg-white p-1'} onClick={toggleFullScreen}>
            {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
          </button>
        </div>
      </div>
    </>
  )
}

export default function Page() {
  return (
    <>
      <div className='grid grid-cols-3 gap-4'>
        <DogWalkView />
        <DogWalkView />
        <DogWalkView />
        <DogWalkView />
        <DogWalkView />
        <DogWalkView />
        <DogWalkView />
        <DogWalkView />
        <DogWalkView />
      </div>
    </>
  )
}
