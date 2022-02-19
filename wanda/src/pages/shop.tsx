import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ShopCard from '../components/shop/ShopCard';
import { RootStore } from '../utils/TypeScript';

function Shop() {
  const { shop } = useSelector((state: RootStore) => state)

  return <div className='h-full mb-8'>
      <h1 className='text-2xl py-8 font-semibold tracking-wider'> All Products </h1>

      <div className='w-full m-auto'>
          {
              shop.map(item => (
                 <div key={item._id} className='w-full'>
                    <Link to={`/category/${item.name}`}> <h1  className='mt-3 mb-4 text-xl font-bold uppercase tracking-widest'> {item.name } ({item.count}) </h1> </Link>

                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full'>
                        {
                            item.products.map(product => (
                                <ShopCard key={product._id} product={product}/>
                            ))
                        }
                    </div>
                  
                 </div>
              ))
          }
      </div>
  </div>;
}

export default Shop;
