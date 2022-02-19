import React from 'react'
import { IUser } from '../../utils/TypeScript'
import EditProfileModal from '../modals/EditProfileModal'

interface IProps{
    user: IUser
    token: string
}

const UserProfile: React.FC<IProps> = ({ user, token }) => {

  return (
    <div>
        
        <div className='flex flex-col items-center justify-center'>
            {
                typeof(user.avatar) === "string" && 
                <img src={user.avatar} className="w-28 h-28 rounded-full object-cover" alt='profile'/>
            }
          
             <div className='text-center'>
                <h1 className='my-2 font-bold text-xl'>{user.name}</h1>
                <p>{user.account}</p>
             </div>    
        </div>

        <EditProfileModal />
         
    </div>
  )
}

export default UserProfile