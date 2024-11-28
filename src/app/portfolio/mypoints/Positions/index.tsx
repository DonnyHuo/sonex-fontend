'use client'

import { useState } from 'react'

import Consumption from './Consumption'
import Source from './Source'

const Positions = () => {
  const [index, setIndex] = useState(0)
  return (
    <>
      <div className='mx-[16px] mb-[24px] mt-[32px] flex cursor-pointer items-center gap-[24px] text-[20px] lg:mx-0 lg:text-[24px]'>
        <div
          className={`${
            index === 0 ? 'text-[#fff]' : 'text-[#9B9B9B]'
          } font-medium`}
          onClick={() => setIndex(0)}
        >
          Points Source
        </div>
        <div
          className={`${
            index === 1 ? 'text-[#fff]' : 'text-[#9B9B9B]'
          } font-medium`}
          onClick={() => setIndex(1)}
        >
          Points Consumption
        </div>
      </div>

      <div className='mx-[16px] mb-[100px] rounded-3xl border border-sn-border bg-sn-section-bg pb-[20px] lg:mx-0'>
        <div className='overflow-auto'>
          {index ? <Consumption /> : <Source />}
        </div>
      </div>
    </>
  )
}

export default Positions
