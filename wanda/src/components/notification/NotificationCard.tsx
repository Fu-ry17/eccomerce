import React from 'react'
import { INotification } from '../../utils/TypeScript'
import moment from 'moment'

interface IProps{
    notify: INotification
}

const NotificationCard: React.FC<IProps> = ({ notify }) => {
  return (
    <div className='flex gap-2 mb-4'>
       <img src={notify.icon} className="block w-20 h-20"/>
       <div>
         <p className={`pb-2 ${notify.read ? 'font-medium': 'font-bold'}`}>{notify.message}</p>
         <div className='flex justify-between items-center px-2'>
            <div></div>
           <span className='text-sm font-semibold'>{moment(notify.createdAt).fromNow()}</span>
         </div>
       
       </div>
     
    </div>
  )
}

export default NotificationCard