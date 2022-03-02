import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart} from '../../redux/actions/cartActions';
import { IProducts, RootStore } from '../../utils/TypeScript';
import { Image } from '@chakra-ui/react';
import LikeButton from './LikeButton';

interface IProps{
   product: IProducts
}

const ShopCard: React.FC<IProps> = ({ product }) => {
   const dispatch = useDispatch() 
   const { cart, auth, wishList } = useSelector((state: RootStore) => state)
 
 
  return <div className='overflow-x-hidden'>
 
   <Link to={`/shop/${product.slug}`}>

   <Image src={product.images[0].url} alt="images"
    className='rounded-md w-full md:max-w-[416px] max-h-[416px] lg:max-h-[276px] lg:h-276px lg:w-416px object-cover object-top block shadow-sm hover:shadow-lg overflow-hidden'/>

   </Link>
   
    <div className='py-2 text-base font-medium flex justify-between'> 
        <h1>  {product.title} </h1> 
        <h3> sold: {product.sold}</h3>
    </div>

    <div className='flex justify-between items-center'>
       <span className='font-semibold'> ksh {Number(product.price).toFixed(2)}</span>

       <LikeButton wishList={wishList} product={product} />
      
       {
          product.quantityInStock === 0 ?  <i className='bx bxs-cart-add text-xl cursor-pointer px-1 text-red-400' ></i>
          :  <i className='bx bxs-cart-add text-xl cursor-pointer px-1' onClick={()=> dispatch(addToCart(product, cart))} ></i>
       }
      
    </div>


  </div>;
}

export default ShopCard;
