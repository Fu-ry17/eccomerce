import { Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Loading from '../../components/alert/Loading'
import { ALERT } from '../../redux/types/alertTypes'
import { getAPI } from '../../utils/fetchData'
import { IOrders, IProducts, RootStore } from '../../utils/TypeScript'

function OrderDetails() {
  const id = useParams<string>().slug
  const [order, setOrder] = useState<IOrders>()
  const [total, setTotal] = useState<number>(0)

  const { auth } = useSelector((state: RootStore)=> state)
  const dispatch = useDispatch()

   useEffect(()=>{
      if(!auth.accessToken) return
      getAPI(`/orders/${id}`, auth.accessToken)
      .then(res => {
         setOrder(res.data.order)
      })
      .catch(err => dispatch({ type: ALERT, payload: { error: err.response.data.msg } }))
   },[auth.accessToken, id, dispatch])

   useEffect(()=>{
      if(!order) return
      let new_total = order.cart?.reduce((prev: number, item: IProducts)=>{
         return prev + (( (item.qty as number) * (item.price as number)))
      },0)

      setTotal(new_total as number)
   },[order])

   if(!id || !order) return <Loading />

  return (
    <div className='py-8 max-w-md m-auto'>

        <h1 className='text-lg font-bold pb-4'> Order ID : {order._id} </h1>

        <div className='flex flex-col gap-y-4 font-medium'>
          <h1> Name : {order.user?.name} </h1>
          <h2> Contact : {order.phone} </h2>
          <h6> Email: {order.user?.account}</h6>
          <h3> Delvery-Location : {order.location} </h3>
          <h4> Payment-Method : {order.paymentMethod}</h4>
          <h5> Paid : {order.paid ? 'Paid' : 'Not Paid' } </h5>
          <span> Ordred On : {new Date(order.createdAt as Date).toLocaleDateString()}</span>
        </div>

        <h1 className='text-2xl font-bold my-6'>ksh {total.toFixed(2)}</h1>

        <div className='my-8 p-2 bg-red-400 text-center text-white'>
          { order.status ? 'Delivered' : 'Not Delivered'}
        </div>
                    
        <div>
          {
            order.cart?.map(item =>(
                <div key={item._id} className="flex gap-4 px-2 items-center mb-4 w-full">
                     <Image src={item.images[0].url} 
                     className='rounded-md w-full max-w-[80px] max-h-[80px] object-cover object-top block shadow-sm hover:shadow-lg overflow-hidden'/> 
                     
                     <div className='flex flex-wrap justify-between w-full items-center'>
                      <div>
                        <Link to={`/shop/${item.slug}`} className="w-full">
                          <h3 className='pb-3 font-bold text-md'>{item.title}</h3>
                        </Link>
                        <span> quantity : 1 * {item.qty} </span>
                      </div>

                      <div className='font-semibold'>
                        ksh: {(item.price as number) * (item.qty as number)}.00
                      </div>
                 
                     </div>
                   
                </div>
            ))
          }
        </div>
    </div>
  )
}

export default OrderDetails