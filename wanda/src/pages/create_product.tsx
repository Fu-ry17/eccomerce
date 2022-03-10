import React from 'react'
import { Link } from 'react-router-dom'
import CreateProducts from '../components/products/CreateProducts'

function Create_product() {

  return (
    <div className='max-w-3xl m-auto'>

        <div className='flex gap-8 flex-wrap py-8'>
         <Link to="/products">  <i className='bx bx-left-arrow-alt text-3xl'></i> </Link>
         <h1 className='text-2xl font-semibold tracking-wider'> Create Product </h1>
        </div>
      

        <CreateProducts />
    </div>
  )
}

export default Create_product