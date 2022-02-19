import { Image } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { DELETE_CART, UPDATE_CART } from '../../redux/types/cartTypes'
import { IProducts } from '../../utils/TypeScript'

interface IProps{
    cart: IProducts[]
}

const OrderDetails: React.FC<IProps> = ({ cart }) => { 
  const dispatch = useDispatch()
  
  const increment = (id: string) => {
      cart.forEach(item => {
          if(item._id === id){
            let new_qty = (item.qty as number) >= item.quantityInStock ? item.quantityInStock : (item.qty as number) += 1
            let new_item = {...item, qty: new_qty}
            dispatch({ type: UPDATE_CART, payload: new_item})
          }
      })
  }

  const decrement = (id: string) => {
    cart.forEach(item => {
        if(item._id === id){
          let new_qty = (item.qty as number) === 1 ? 1 : (item.qty as number) -= 1
          let new_item = {...item, qty: new_qty}
          dispatch({ type: UPDATE_CART, payload: new_item})
        }
    })
  }

  return (
    <div className='w-full'>
        
        <div className='w-full '>
         <div className='w-full'>
            {
                cart.map(item => (
                    <div key={item._id} className="flex justify-between items-center shadow-md border rounded-md mb-4 p-2 w-full" >
                        <Image src={item.images[0].url} 
                        className='rounded-md w-full max-w-[80px] max-h-[80px] object-cover object-top block shadow-sm hover:shadow-lg overflow-hidden'/> 

                        <div className='flex flex-col items-center justify-center'>
                            <Link to={`/shop/${item.slug}`} className="max-w-[100px]">
                             <h3 className='pb-2'>{item.title}</h3>
                           </Link>
                           

                            <div>
                                <span onClick={()=> decrement((item._id as string))} className="cursor-pointer"> - </span>
                                   <span className='px-1'>  {item.qty} </span>
                                <span onClick={()=> increment((item._id as string))} className="cursor-pointer"> + </span>
                            </div>
                        </div>

                        <div className='flex flex-col items-center justify-center'>
                           <div className='pb-2'>ksh: {(item.qty as number) * (item.price as number)} </div>  
                            <i className='bx bx-trash' onClick={()=> dispatch({ type: DELETE_CART, payload: item._id })}></i>
                        </div>
                      

                    </div>
                ))
            }
         </div>

        </div>
      
    </div>
  )
}

export default OrderDetails