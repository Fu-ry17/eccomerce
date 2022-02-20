import React from 'react'
import { useSelector } from 'react-redux'
import { RootStore } from '../utils/TypeScript'

function Notification() {

  const { openNotify } = useSelector((state: RootStore) => state) 

  return (
    <div className={`fixed ${openNotify ? 'right-0': '-right-full' } transition duration-500 ease-out
                    h-full bg-white w-full sm:1/2 md:1/2 lg:w-1/4 block border-l shadow-md z-100`}>
        <h1 className='p-2 font-bold text-xl'> Notifications </h1>
        

    </div>
  )
}

export default Notification