import React from 'react';
import { Link } from 'react-router-dom';
import AllProducts from '../components/products/AllProducts';
import CreateProducts from '../components/products/CreateProducts';

function Products() {
  return <div className='py-6 max-w-3xl m-auto'>

     <div className='flex justify-between items-center'>
         <h1 className='text-2xl font-bold'> Products </h1> 

         <div className='flex gap-x-4 items-center'>
           <Link to={`/create_product`} className='bg-red-400 py-1 px-4 rounded-md text-white text-sm'> Add  +  </Link>
         </div>
      </div>
     
      <div className='w-full my-4'>
        <input type="text" placeholder='Search' className='w-full p-2 border border-gray-300 hover:border-gray-900 outline-none rounded-lg' />
      </div>
    
      
      <main className=''>
           <AllProducts />
      </main>
  </div>
}

export default Products;
