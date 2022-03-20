import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OPEN_NOTIFY } from '../redux/types/alertTypes'
import { RootStore } from '../utils/TypeScript'
import { permissionCheck } from '../utils/valid'
import NotificationCard from './notification/NotificationCard'

function Notification() {

  const { openNotify, userNotifications } = useSelector((state: RootStore) => state) 
  const [allow, setAllow] = useState(false)

  const dispatch = useDispatch()
  
  useEffect(()=> {
    if(allow === true){
      const check = permissionCheck()
    }
  },[allow])

  useEffect(()=> {
     const check = localStorage.getItem('notified')
     if(check === "true") setAllow(true)
  },[])

  return (
    <div className={`fixed ${openNotify ? 'right-0': '-right-full' } transition duration-500 ease-out px-2 sm:max-w-sm 
                    h-full bg-white w-full block border-l shadow-md z-100 overflow-y-scroll`}>   

      <div className='flex justify-between items-center w-full'>
          <h1 className='font-bold text-xl'> Notifications </h1>
         
         {
           allow ? <i className='bx bxs-toggle-right text-3xl cursor-pointer' onClick={()=> setAllow(false)}></i> :
            <i className='bx bxs-toggle-left text-3xl cursor-pointer' onClick={()=> setAllow(true)}></i>
         } 

         <i className='bx bx-collapse-horizontal hover:font-bold text-black' onClick={()=> dispatch({ type: OPEN_NOTIFY, payload: !openNotify})}></i>
         
      </div>

      <div className='w-full'>
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