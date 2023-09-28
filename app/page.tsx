'use client'
import { Dog } from '@/components/canvas/Examples'
import { loadView } from '@/components/canvas/View'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const View = loadView()
const Common = dynamic<any>(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export default function Page() {
  return (
    <>
      <div className='h-screen w-full'>
        <View orbit className='h-full  sm:w-full'>
          <Suspense fallback={null}>
            <Dog scale={2} position={[0, -1.6, 0]} rotation={[0.0, -0.3, 0]} />
            <Common color={'lightpink'} />
          </Suspense>
        </View>
      </div>
    </>
  )
}
