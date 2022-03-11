import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useParams } from 'react-router-dom'
import Loading from '../../components/alert/Loading'
import Pagination from '../../components/Pagination'
import ShopCard from '../../components/shop/ShopCard'
import { getProductByCategory } from '../../redux/actions/productActions'
import { IProducts, RootStore } from '../../utils/TypeScript'

function Category() {
   const slug = useParams<string>().slug
   const [ categoryId, setCategoryId] = useState('')
   const [products, setProducts] = useState<IProducts[]>()
   const [total, setTotal] = useState(0)

   const { categories, productCategory } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch()

   const { search } = useLocation()


   useEffect(() => {
       const category =  categories.find(item => item.name === slug)
       if(category) setCategoryId(category._id)
   },[categories, slug])

    useEffect(()=> {
        if(!categoryId) return

        if(productCategory.every(item => item.id !== categoryId)){
            dispatch(getProductByCategory(categoryId, search))
        }else{
            const data = productCategory.find(item => item.id === categoryId)
            if(!data) return
            setProducts(data.products)
            setTotal(data.total)
        }
    },[categoryId, dispatch,productCategory, search])

    const handlePagination = (num: number) => {
        const search = `?page=${num}`
        dispatch(getProductByCategory(categoryId, search))
    }

   if(!categoryId) return <Loading />

  return (
    <div className='mb-8'>

        <div className='flex gap-8 items-center py-8'>
            <Link to="/">
            <i className='bx bx-left-arrow-alt text-3xl'></i>
            </Link>
        
            <h1 className='text-2xl font-semibold tracking-wider'> {slug} </h1>
        </div>
      
        
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full'>
           {
               products?.map(item => (
                   <ShopCard key={item._id} product={item}/>
               ))
           }
        </div>

        <Pagination total={total} callback={handlePagination}/>


    </div>
  )
}

export default Category