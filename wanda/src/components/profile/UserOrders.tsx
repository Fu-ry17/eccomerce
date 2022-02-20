import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getuserOrders } from '../../redux/actions/userActions'
import { RootStore } from '../../utils/TypeScript'

function UserOrders() {
  
  const { auth } = useSelector(( state: RootStore) => state)
  const dispatch = useDispatch()

  useEffect(()=> {
    if(!auth.accessToken || !auth.user) return

    dispatch(getuserOrders( auth.user._id, auth.accessToken))
  },[])

  return (
    <div>
        UserOrders
    </div>
  )
}

export default UserOrders