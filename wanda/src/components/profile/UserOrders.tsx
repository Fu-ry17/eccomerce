import React from 'react'
import { useSelector } from 'react-redux'
import { RootStore } from '../../utils/TypeScript'
import Loading from '../alert/Loading'
import OrdersCard from '../orders/OrdersCard'

interface IProps{
  id: string
}

const UserOrders: React.FC<IProps> = ({ id }) => {

  const { userOrders } = useSelector(( state: RootStore) => state)

  if(!userOrders) return <Loading />


  return (
    <div className=''>
         <h1 className='text-xl font-semibold tracking-wider'> Your Orders </h1>

            {
                userOrders.orders?.map((order,i) => (
                  <OrdersCard key={i} order={order}/>
                ))
            }
        

    </div>
  )
}

export default UserOrders