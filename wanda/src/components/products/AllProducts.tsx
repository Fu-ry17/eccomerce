import React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../utils/TypeScript';
import ProductsCard from './ProductsCard';


function AllProducts() {
  const { products } = useSelector(( state: RootStore) => state)

  return <div className='w-full'>  
      {
        products.map(item => (
          <ProductsCard key={item._id} product={item}/>
        ))
      }

  </div>;
}

export default AllProducts;
