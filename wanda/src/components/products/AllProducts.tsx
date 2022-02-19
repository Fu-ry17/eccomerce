import React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../utils/TypeScript';
import ProductsTable from './ProductsTable';

function AllProducts() {
  const { products } = useSelector(( state: RootStore) => state)

  return <div>
      <h1> All Products </h1>
      
      <ProductsTable products={products}/>


  </div>;
}

export default AllProducts;
