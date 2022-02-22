import React from 'react'
import { useSelector } from 'react-redux'
import Loading from '../components/alert/Loading'
import NotFound from '../components/NotFound'
import UserOrders from '../components/profile/UserOrders'
import UserProfile from '../components/profile/UserProfile'
import WishList from '../components/profile/WishList'
import { RootStore } from '../utils/TypeScript'

function Profile() {
    const { auth } = useSelector((state: RootStore)=> state)

    if(!auth.accessToken) return <NotFound />
  
    if(!auth.user) return <Loading />
  

  return (
    <div className='grid md:grid-cols-2 max-w-5xl m-auto py-8 gap-6'>

        <div>
           <UserProfile user={auth.user} token={auth.accessToken} />
           <WishList />
        </div>

        <UserOrders id={auth.user._id} />
    </div>
  )
}

export default Profile