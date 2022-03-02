import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToWishList } from '../../redux/actions/wishListactions'
import { IAuth } from '../../redux/types/authTypes'
import { IProducts } from '../../utils/TypeScript'

interface IProps{
   wishList: IProducts[],
   product: IProducts
}

const LikeButton: React.FC<IProps> = ({ wishList, product }) => {
     const [like, setLike] = useState(false)

     const dispatch = useDispatch()

     // like
     const handleLike = () => {
        setLike(true) 
        dispatch(addToWishList(wishList, product))
     } 
 
     // unlike
     const handleDisLike = () => {
        setLike(false)
     }   

  return (
    <span className='flex items-center justify-center text-lg gap-1'>
       {
            like ?  <i className='bx bxs-heart text-red-400 text-xl' onClick={handleDisLike}></i> 
            : <i className='bx bx-heart cursor-pointer hover:text-red-400 text-xl' onClick={handleLike}></i>
       }
     
    </span>
  )
}

export default LikeButton