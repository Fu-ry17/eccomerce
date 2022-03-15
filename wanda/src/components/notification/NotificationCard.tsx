import React from 'react'
import { INotification } from '../../utils/TypeScript'
import moment from 'moment'
import { Avatar } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { OPEN_NOTIFY } from '../../redux/types/alertTypes'

interface IProps{
    notify: INotification
}

const NotificationCard: React.FC<IProps> = ({ notify }) => {
   
  const dispatch = useDispatch()

  return (
    <div className='flex gap-4 my-4'>
       <Avatar src={notify.icon} size="md" />
       <Link to={`/${notify.url_id}`} onClick={()=> dispatch({ type: OPEN_NOTIFY, payload: false })}>
         <p className={`${notify.read ? 'font-medium': 'font-bold'} text-sm`}>{notify.message}</p>
         <div className='flex justify-between items-center px-2'>
            <div></div>
           <span className='text-xs font-semibold'>{moment(notify.createdAt).fromNow()}</span>
         </div>
       
       </Link>
     
    </div>
  )
}

export default NotificationCard