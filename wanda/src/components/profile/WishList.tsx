import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../../redux/actions/cartActions'
import { IProducts } from '../../utils/TypeScript'

interface IProps{
   wishList: IProducts[],
   cart: IProducts[]
}

const WishList: React.FC<IProps> = ({ wishList, cart }) => {

  const dispatch = useDispatch()

  return (

    <div>
       <h1 className='text-xl font-semibold tracking-wider'> My WishList </h1>

       {
         wishList.map(item => (
          <div className='flex justify-between items-center gap-4 my-4 shadow-md p-2 border rounded-md'>
            <Link to={`/shop/${item.slug}`}>
              <img src={item.images[0].url} alt='avatar' 
              className="w-16 h-16 object-cover"/>
            </Link>
            
            <div className='flex flex-wrap gap-y-1 gap-x-2 lg:gap-8'>
                 <span className='block font-bold'>{item.title}</span>
                <span>ksh {Number(item.price).toFixed(2)}</span>    
            </div>

            <span className='text-xl flex items-center flex-wrap gap-3 cursor-pointer'>
               {
                 item.quantityInStock === 0 ?   <i className='bx bxs-cart text-red-400'></i> :
                  <i className='bx bxs-cart' onClick={()=> dispatch(addToCart(item, cart))}></i>
               }
               <i className='bx bx-trash'></i>
            </span>
      
        </div>
         ))
       }
    </div>

  )
}

export default WishList