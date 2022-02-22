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
            
            <div className='flex flex-wrap gap-4 lg:gap-8'>
                <span className='block font-bold'>ksh {amount}</span>    
                <span>{order.paid ? 'Paid' : 'Not paid'}</span>
            </div>

            <span>{ new Date(order.createdAt as Date).toLocaleDateString()}</span>
       
      </Link>
    </div>
  )
}

export default OrdersCard