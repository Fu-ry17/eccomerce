import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getuserOrders } from '../../redux/actions/userActions'
import { RootStore } from '../../utils/TypeScript'
import Loading from '../alert/Loading'
import OrdersCard from '../orders/OrdersCard'
import Pagination from '../Pagination'

interface IProps{
  id: string
  token: string
}

const UserOrders: React.FC<IProps> = ({ id, token }) => {

  const { userOrders } = useSelector(( state: RootStore) => state)
  const dispatch = useDispatch()

  if(!userOrders.orders  || !userOrders.total) return <h1> You currently have no Orders </h1>

  const handlePagination = (num: number) =>{
    const search = `?page=${num}`
    dispatch(getuserOrders(id, token, search))
  } 

  return (
    <div className=''>
         <h1 className='text-xl font-semibold tracking-wider'> Your Orders </h1>

            {
                userOrders.orders.map((order,i) => (
                  <OrdersCard key={i} order={order}/>
                ))
            }
            
            <Pagination total={userOrders.total} callback={handlePagination}/>

    </div>
  )
}

export default UserOrders