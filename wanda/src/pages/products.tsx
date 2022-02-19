import React from 'react';
import AllProducts from '../components/products/AllProducts';
import CreateProducts from '../components/products/CreateProducts';

function Products() {
  return <div>
      <h1> Products </h1> 
      
      <main className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        <div>
          <CreateProducts />
        </div>

        <div>
           <AllProducts />
        </div>
      </main>
  </div>;
}

export default Products;
