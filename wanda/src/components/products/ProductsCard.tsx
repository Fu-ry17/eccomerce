import { Image } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IProducts } from '../../utils/TypeScript'

interface IProps{
  product: IProducts
}

const ProductsCard: React.FC<IProps> = ({ product }) => {
  const navigate = useNavigate()

  const handleUpdate = (id: string) => {
     if(id) navigate(`/create_product?slug=${id}`)
  }

  return (
     <div className='py-4 w-full border-b border-gray-500'>
        <div className='grid grid-cols-4'>
          <h1 className='font-bold'>{product.title}</h1>
          <h2 className='text-center text-sm font-semibold'> {Number(product.price).toFixed(2)}</h2>
          <h3 className={`${product.quantityInStock === 0 ? 'bg-red-400': 'bg-blue-200'} text-center text-white rounded-md`}>
            {product.quantityInStock === 0 ? 'inactive' : 'active'}</h3>

          <span className='text-center flex text-lg gap-x-4 items-center justify-center'>
             <i className='bx bx-pencil cursor-pointer' onClick={()=> handleUpdate(product.slug as string)}></i>
             <i className='bx bxs-trash'></i>
          </span>
        </div>
     </div>
  )
}

export default ProductsCard