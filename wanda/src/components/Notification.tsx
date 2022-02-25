import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootStore } from '../utils/TypeScript'
import NotificationCard from './notification/NotificationCard'

function Notification() {

  const { openNotify, userNotifications } = useSelector((state: RootStore) => state) 
  const [allow, setAllow] = useState(false)
  

  return (
    <div className={`fixed ${openNotify ? 'right-0': '-right-full' } transition duration-500 ease-out px-2
                    h-full bg-white w-full sm:1/2 md:1/2 lg:w-1/4 block border-l shadow-md z-100 overflow-y-scroll`}>   

      <div className='flex justify-between items-center'>
          <h1 className='font-bold text-xl'> Notifications </h1>
         
         {
           allow ? <i className='bx bxs-toggle-right text-3xl cursor-pointer' onClick={()=> setAllow(false)}></i> :
            <i className='bx bxs-toggle-left text-3xl cursor-pointer' onClick={()=> setAllow(true)}></i>
         } 
         
      </div>

      <div className=''>
        {
          userNotifications.map(notify => (
            <NotificationCard key={notify._id} notify={notify}/>
          ))
        }

      </div>
      
        

    </div>
  )
}

export default Notification