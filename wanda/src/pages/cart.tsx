import React from 'react'
import { useSelector } from 'react-redux'
import Loading from '../components/alert/Loading'
import EmptyCart from '../components/cart/EmptyCart'
import OrderDetails from '../components/cart/OrderDetails'
import UserDetails from '../components/cart/UserDetails'
import { RootStore } from '../utils/TypeScript'

function Cart() {
  const { cart } = useSelector((state: RootStore) => state)

  if(!cart) return <Loading />

  if(cart.length === 0) return <EmptyCart />


  return (
    <div className='max-w-6xl m-auto grid md:grid-cols-2 grid-cols-1 gap-6 pt-8 w-full'>
        <OrderDetails cart={cart} />
        <UserDetails cart={cart} />
    </div>
  )
}

export default Cart