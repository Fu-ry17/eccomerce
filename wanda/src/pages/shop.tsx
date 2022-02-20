import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ShopCard from '../components/shop/ShopCard';
import { RootStore } from '../utils/TypeScript';

function Shop() {
  const { shop, categories } = useSelector((state: RootStore) => state)
  const [categName, setCategoryName] = useState('')

  const navigate = useNavigate()

  useEffect(()=> {
     if(!categName) return
     if(categName) navigate(`/category/${categName}`)
  },[categName, navigate])

  return <div className='h-full mb-8'>

      <div className='flex justify-between w-full flex-wrap'>
         <h1 className='text-2xl py-8 font-semibold tracking-wider'> All Products </h1>
         
         <select name='category' value={categName} onChange={e => setCategoryName(e.target.value)} className="outline-none bg-white">
             <option> choose a category</option>
             {
                 categories.map(item =>(
                     <option key={item._id}>{item.name}</option>
                 ))
             }
         </select>

      </div>
     

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
