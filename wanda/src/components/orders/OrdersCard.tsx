import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IOrders } from '../../utils/TypeScript'

interface IProps{
    order: IOrders
}

const OrdersCard: React.FC<IProps> = ({ order }) => {
   const [amount, setAmount] = useState(0)
   
   useEffect(()=> {
     if(!order) return

     let new_total = order.cart?.reduce((prev, item) =>{
        return prev + ((item.qty as number) * (item.price as number))
     },0)

     setAmount(new_total as number)

   },[order])

  return (
    <div>
        <Link to={`/order/${order._id}`} className='flex justify-between items-center gap-4 my-4 shadow-md p-2 border rounded-md'>
            <img src={order.user?.avatar} alt='avatar' 
             className="w-16 h-16 rounded-full object-cover"/>

            <div className='flex flex-col flex-wrap gap-y-1 gap-x-2 md:flex-row md:gap-x-8'>
                <h1 className='font-bold'>{order.user?.name}</h1>
                <p className='font-semibold'>ksh {amount.toFixed(2)}</p>    
                <p>{order.status ? 'Delivered' : 'Not Delivered'}</p>
            </div>

            <span className='text-sm font-bold'>{moment(order.createdAt).fromNow()}</span>
      </Link>
    </div>
  )
}

export default OrdersCard