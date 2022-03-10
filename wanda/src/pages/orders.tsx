import React from 'react'
import { useSelector } from 'react-redux'
import OrdersCard from '../components/orders/OrdersCard'
import { RootStore } from '../utils/TypeScript'

function Orders() {
  const { orders } = useSelector((state: RootStore)=> state)

  return (
    <div className='py-8 m-auto max-w-3xl'>
     
        <h1 className='text-2xl mb-3 font-bold'> Orders </h1> 

        <div className='mb-4'>
            <input type="text" name='quantityInStock' placeholder='Search Orders'  
            className='w-full border hover:border-gray-400 rounded-md p-3 outline-none'/>
        </div>

         {
             orders.map(item => (
                 <OrdersCard key={item._id} order={item} />
             ))
         }

    </div>
  )
}

export default Orders