import React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../utils/TypeScript';
import Loading from '../alert/Loading';
import ProductsCard from './ProductsCard';


function AllProducts() {
  const { products, auth } = useSelector(( state: RootStore) => state)

  return <div className='w-full'>  
      {
        products.map(item => (
          <ProductsCard key={item._id} product={item} token={(auth.accessToken as string)}/>
        ))
      }

  </div>;
}

export default AllProducts;
