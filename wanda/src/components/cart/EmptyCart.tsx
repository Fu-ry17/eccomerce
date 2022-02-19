import React from 'react'

function EmptyCart() {
  return (
    <div className='flex justify-center items-center w-full min-h-[calc(100vh-6rem)]'>
        <div className='text-center'>
           <i className='bx bxs-cart-alt text-5xl mb-2'></i>
          <h3> Your Cart is Empty</h3>
        </div> 
    </div>
  )
}

export default EmptyCart