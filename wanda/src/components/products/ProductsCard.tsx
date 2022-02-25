import { Image } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { IProducts } from '../../utils/TypeScript'

interface IProps{
  product: IProducts
}

const ProductsCard: React.FC<IProps> = ({ product }) => {
  return (
    <div className="flex justify-between items-center shadow-md border rounded-md mb-4 p-2 w-full" >
      <Image src={product.images[0].url} 
      className='rounded-md w-full max-w-[80px] max-h-[80px] object-cover object-top block shadow-sm hover:shadow-lg overflow-hidden'/> 

      <div className='flex flex-col'>
            <h3 className=''>{product.title}</h3>
            <span className="cursor-pointer block"> price : {product.price} </span>
            <span className='block'>  quantity : {product.quantityInStock} </span>
      </div>

      <div className='flex flex-col items-center justify-center'>
        <div className=''>edit  </div>  
          <i className='bx bx-trash'></i>
      </div>
  
</div>
  )
}

export default ProductsCard