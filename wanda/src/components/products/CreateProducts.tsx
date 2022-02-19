import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProducts } from '../../redux/actions/productActions';
import { ALERT } from '../../redux/types/alertTypes';
import { validImage } from '../../utils/imageUpload';
import { InputChange, IProducts, RootStore } from '../../utils/TypeScript';
import { validProducts } from '../../utils/valid';

function CreateProducts() {
  const initialState = { title:'', description: '', price: '', quantityInStock: '', category: '',images: []}
  const [products, setProducts] = useState<IProducts>(initialState)
  const [images, setImages] = useState<File[]>([])
 
  const dispatch = useDispatch()
  const { categories, auth } = useSelector(( state: RootStore) => state)

  const { title, description, price, quantityInStock, category } = products

  const handleChange = (e: InputChange) => {
      const { name, value} = e.target
      setProducts({ ...products, [name]:value})
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

      const check = validProducts(products)
      if(check) return dispatch({ type: ALERT, payload: {error: check.msg} })
       
      if(images.length === 0) 
         return dispatch({ type: ALERT, payload: { error: 'No image has been uploaded'}})

      dispatch(createProducts(products, images, auth.accessToken))
  }

  return <div>
      <h1> Create Products</h1>

      <form onSubmit={handleSubmit}>
          <span className='grid grid-cols-1 gap-2 md:grid-cols-2 '>

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
                <div className='grid grid-cols-4 gap-2 max-h-[210px] overflow-auto p-2'>
                    {
                        images.map((item, i) =>(
                            <div key={i}>
                               <img src={URL.createObjectURL(item)} alt="images" 
                               className='block w-full max-h-[180px] cursor-pointer' onClick={()=> handleDelete(i)}/>
                            </div>  
                        ))
                    }
                  
                </div>
            </div> 

           </span>
           
           <button className='bg-red-400 w-full py-2 my-4 rounded-md text-white font-semibold mb-8
                            text-lg tracking-wider transition duration-300 ease-out hover:bg-red-600 lg:w-1/2'> Create Product
              </button>
        
      </form>

  </div>;
}

export default CreateProducts;
