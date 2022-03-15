import { Image } from '@chakra-ui/react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IProducts } from '../../utils/TypeScript'
import DeleteProductModal from '../modals/DeleteProductModal'

interface IProps{
  product: IProducts,
  token: string
}

const ProductsCard: React.FC<IProps> = ({ product, token }) => {
  const navigate = useNavigate()

  const handleUpdate = (id: string) => {
     if(id) navigate(`/create_product?slug=${id}`)
  }

  return (
     <div className='py-4 w-full border-b border-gray-500'>
        <div className='grid grid-cols-4'>
          <Link to={`/shop/${product.slug}`} className='font-bold'>{product.title}</Link>
          <h2 className='text-center text-sm font-semibold'> {Number(product.price).toFixed(2)}</h2>
          <h3 className={`${product.quantityInStock === 0 ? 'bg-red-400': 'bg-blue-200'} text-center text-white rounded-md`}>
            {product.quantityInStock === 0 ? 'inactive' : 'active'}</h3>

          <span className='text-center flex text-lg gap-x-4 items-center justify-center'>
             <i className='bx bx-pencil cursor-pointer' onClick={()=> handleUpdate(product.slug as string)}></i>
             <DeleteProductModal products={product} token={token}/>
          </span>
        </div>
     </div>
  )
}

export default ProductsCard