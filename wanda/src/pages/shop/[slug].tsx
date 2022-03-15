import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../components/alert/Loading';
import NotFound from '../../components/NotFound';
import { Images, IProducts, RootStore } from '../../utils/TypeScript';
import { Image } from '@chakra-ui/react';
import { addToCart } from '../../redux/actions/cartActions';
import ShopCard from '../../components/shop/ShopCard';
import LikeButton from '../../components/shop/LikeButton';
import SoldChart from '../../components/chart/SoldChart';

function ProductDetails() {
  const slug = useParams<string>().slug
  const dispatch = useDispatch()
  const [product, setProduct] = useState<IProducts>()
  const [relatedProducts, setRelatedProducts] = useState<IProducts[]>()
  const [images, setImages] = useState<Images[]>()
  const [index, setIndex] = useState(0)
  const { auth, cart, products, wishList } = useSelector((state: RootStore) => state)

   useEffect(()=> {
      if(!slug) return
       products.forEach(item => {
         if(item.slug === slug){
           setProduct(item)
           if(!product) return
           setImages(product.images)
           setIndex(0)
           window.scrollTo(0,0)
         }
      })   
   },[slug,product,products])

   
   useEffect(()=> {
       if(!product) return
       let new_products = products.filter(item => item.category === product.category)
       setRelatedProducts(new_products)
   },[product, products])


   if(!slug) return <NotFound />

   if(!product || !images) return <Loading />

   if(!relatedProducts) return <Loading />

  return <div className='max-w-4xl mx-auto mb-8'>
      
       <div className='grid grid-cols-1 md:grid-cols-2 gap-4 py-8'>

         <div className='mb-4'>
            <Image src={images[index].url} alt="images"
            className='rounded-md w-full max-w-[416px] h-[400px] max-h-[400px] object-cover object-top block shadow-sm hover:shadow-lg '/>

                  <div className='grid grid-cols-4 gap-2 max-h-[130px] overflow-auto py-2'>
                    {
                      images.length > 1 &&  images.map((item, i) =>(
                            <div key={i}>
                               <img src={item.url} alt="images" onClick={()=> setIndex(i)}
                               className='block w-full max-h-[110px] cursor-pointer rounded-md'/>
                            </div>  
                        ))
                    }
                  
                </div>
         </div>
      
          <div>
            
            <div className='flex justify-between items-center flex-wrap gap-2'>
              <h1 className='text-3xl font-bold uppercase tracking-wider pb-4'> {product.title} </h1>
              <LikeButton wishList={wishList} product={product} />
            </div>
          

            <div>
                <p className='text-justify'>{product.description}</p>
                <h1 className='text-xl font-bold py-4'> ksh: {Number(product.price).toFixed(2)}</h1>
                <div className='flex justify-between mb-4 font-semibold'>
                   <span> sold: {product.sold}</span>
                   <span> quantity in stock: {product.quantityInStock}</span>
                </div>
            </div>

            <div className='py-4'>
              {
                auth.user?.role === 'admin' ? <Link to={`/create_product?slug=${product.slug}`}> 
                   <button className='bg-red-400 text-white py-2 md:w-1/2 px-2 w-full rounded-md'> Edit Product </button> </Link>
                : 
                product.quantityInStock === 0 ?   <button className='bg-red-400 text-white py-2 md:w-1/2 px-2 w-full rounded-md'> Out Of Stock </button>
                : <button className='bg-red-400 text-white py-2 md:w-1/2 px-2 w-full rounded-md' onClick={()=> dispatch(addToCart(product, cart))}> Add To Cart </button>
              }
            
              
            </div>

          </div>

       </div>

      <div className='z-0 shadow-sm'>
        <SoldChart related={relatedProducts}/>
      </div>
    

       <h1 className='text-2xl pb-4 font-semibold'> Related Products </h1>
       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 w-full'>
           {
              relatedProducts.map(product => (
               <ShopCard key={product._id} product={product}/>
              ))
            }
        </div>

  </div>;
}

export default ProductDetails;
