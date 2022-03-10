import { Image } from '@chakra-ui/react';
import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProducts, updateProduct } from '../../redux/actions/productActions';
import { ALERT } from '../../redux/types/alertTypes';
import { validImage } from '../../utils/imageUpload';
import { Images, InputChange, IProducts, RootStore } from '../../utils/TypeScript';
import { validProducts } from '../../utils/valid';

function CreateProducts() {
  const initialState = { title:'', description: '', price: '', quantityInStock: '', category: '',images: []}
  const [product, setProduct] = useState<IProducts>(initialState)
  const [images, setImages] = useState<File[] | any[]>([])
  const [edit, setEdit] = useState(false)
 
  const dispatch = useDispatch()
  const { categories, auth, products } = useSelector(( state: RootStore) => state)


  const { title, description, price, quantityInStock, category } = product

  const handleChange = (e: InputChange) => {
      const { name, value} = e.target
      setProduct({ ...product, [name]:value})
  }

  const handleUpload = async (e: any) => {
      const files = [...e.target.files]
      const imageArr: File[] = []

      files.forEach(item => {
           const check = validImage(item)
           if(check) return dispatch({ type: ALERT, payload: { error: check.msg}})

           imageArr.push(item)     
      })
      setImages([ ...images, ...imageArr])
  }
  
  const handleDelete =(id: number) =>{
      let new_images = images.filter((item, i) => i !== id)
      setImages(new_images)
  }

  const handleSubmit = (e: FormEvent) => {
      e.preventDefault()
      if(!auth.accessToken) return

      const check = validProducts(product)
      if(check) return dispatch({ type: ALERT, payload: {error: check.msg} })
       
      if(images.length === 0) 
         return dispatch({ type: ALERT, payload: { error: 'No image has been uploaded'}})

      if(edit){
         dispatch(updateProduct(product, images, auth.accessToken)) 
      }else{
         dispatch(createProducts(product, images, auth.accessToken))
      }     
  }

  useEffect(()=> {
      const slug = new URLSearchParams(window.location.search).get('slug')
      if(slug){
          products.forEach(item => {
              if(item.slug === slug){
                  setProduct(item)
                  setImages(item.images)
                  setEdit(true)
              }
          })
      }  
  },[products])

  return <div>


  
      <form onSubmit={handleSubmit}>
          <span className='grid grid-cols-1 gap-4 md:gap-2 md:grid-cols-2 '>

            <div>
                <input type="text" name='title' placeholder='Title' className='w-full border hover:border-gray-400 rounded-md p-2 outline-none'
                 value={title} onChange={handleChange} />
            </div>

            <div>
                <input type="number" name='price' placeholder='Price' value={price} onChange={handleChange}
                className='w-full border hover:border-gray-400 rounded-md p-2 outline-none'/>
            </div>

            <div>
               <select name='category' value={(category as string)} onChange={handleChange}
               className='w-full border hover:border-gray-400 rounded-md p-2 outline-none'>
                   <option>choose category</option>
                   {
                       categories.map(item => (
                           <option key={item._id} value={item._id}>{item.name}</option>
                       ))
                   }
               </select>
            </div>

            <div>
                <input type="number" name='quantityInStock' placeholder='Quantity in stock' value={quantityInStock} onChange={handleChange} 
                className='w-full border hover:border-gray-400 rounded-md p-2 outline-none'/>
            </div>

            <div className='col-span-1 md:col-span-2'>
                <textarea placeholder='Description....' name='description' rows={6}
              className='w-full border hover:border-gray-400 rounded-md p-2 outline-none'
              value={description} onChange={handleChange} style={{ resize: 'none'}} />
            </div>

            <div className='col-span-1 md:col-span-2'>
                <label htmlFor="file"> upload images </label>
                <input type="file" name='file' id='file' accept='image/*' multiple className='hidden' onChange={handleUpload}/>
            </div>

            <div className='col-span-1 md:col-span-2'>
                <div className='grid lg:grid-cols-4 grid-cols-3  gap-2 max-h-[210px] overflow-auto p-2'>
                    {
                        images.map((item, i) =>(
                            <div key={i}>   
                               <Image src={item.url ? item.url : URL.createObjectURL(item)} onClick={()=> handleDelete(i)}
                                  className='rounded-md w-full max-w-[180px] max-h-[180px] object-cover object-top block shadow-sm hover:shadow-lg overflow-hidden'/>  
                            </div>  
                        ))
                    }
                  
                </div>
            </div> 

           </span>
           
           <button className='bg-red-400 w-full py-2 my-4 rounded-md text-white font-semibold mb-8
                 text-lg tracking-wider transition duration-300 ease-out hover:bg-red-600 lg:w-1/2'> { edit ? 'Update Product' : 'Create Product'}
            </button>
        
      </form>

  </div>;
}

export default CreateProducts;
