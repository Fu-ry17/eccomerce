import { auth } from 'google-auth-library'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { IOrders, RootStore } from '../../utils/TypeScript'
import Loading from '../alert/Loading'

interface IProps{
    order: IOrders
}

const OrdersCard: React.FC<IProps> = ({ order }) => {
   const [amount, setAmount] = useState(0)

   const { auth } = useSelector((state: RootStore) => state)
   
   useEffect(()=> {
     if(!order) return

     let new_total = order.cart?.reduce((prev, item) =>{
        return prev + ((item.qty as number) * (item.price as number))
     },0)

     setAmount(new_total as number)

   },[order])

   if(!auth.user) return <Loading />

  return (
    <div>
        <Link to={`/order/${order._id}`} className='flex justify-between items-center gap-4 my-4 shadow-md p-2 border rounded-md'>
            <img src={order.user?.avatar} alt='avatar' 
             className="w-14 h-14 rounded-full object-cover"/>

            <div className='flex flex-col flex-wrap gap-y-1 justify-evenly items-center md:flex-row md:gap-x-8'>
                {
                  auth.user.role === 'admin' && <h1 className='font-bold'>{order.user?.name}</h1>
                }
                <p className='font-semibold'>ksh {amount.toFixed(2)}</p>    
                <p className={`${order.status ? 'bg-green-300' : 'bg-red-300'} text-white text-sm text-center px-4 py-1 rounded-lg`}>{order.status ? 'Delivered' : 'Not Delivered'}</p>
            </div>
            
        
            <span className='text-sm font-bold'>{moment(order.createdAt).fromNow()}</span>
          
      </Link>
    </div>
  )
}

export default OrdersCard