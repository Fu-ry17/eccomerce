import React from 'react'
import { INotification, RootStore } from '../../utils/TypeScript'
import moment from 'moment'
import { Avatar } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { OPEN_NOTIFY } from '../../redux/types/alertTypes'
import { deleteNotify, readNotify } from '../../redux/actions/userActions'

interface IProps{
    notify: INotification
}

const NotificationCard: React.FC<IProps> = ({ notify }) => {
   
  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootStore) => state)

  const handleRead = (notify: INotification) => {
     if(!auth.accessToken) return

     dispatch(readNotify(notify, auth.accessToken))
     dispatch({ type: OPEN_NOTIFY, payload: false})
  }

  return (
    <div className='mb-3 flex gap-x-3 max-w-md m-auto'>
       <Avatar src={notify.icon} size="md" />

       <div>
          <Link to={`/${notify.url_id}`} onClick={()=> handleRead(notify)}>
             <p className={`text-sm mb-2 ${notify.read ? 'font-medium': 'font-bold'}`}> {notify.message} </p>
          </Link>

          <div className='flex justify-between text-xs'>
            <span>{moment(notify.createdAt).fromNow()}</span>
            <i className='bx bx-trash cursor-pointer px-3' onClick={()=> dispatch(deleteNotify(notify._id, auth.accessToken as string))}></i>
          </div>

       </div>  
    </div>
  )
}

export default NotificationCard