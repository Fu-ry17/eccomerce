import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../components/modals/DeleteModal';
import NotFound from '../components/NotFound';
import { createCategory, updateCategory } from '../redux/actions/categoryActions';
import { ICategory, RootStore } from '../utils/TypeScript';

function Categories() {
   const [ name, setName] = useState('')
   const [edit, setEdit] = useState<ICategory | null>()

   const navigate = useNavigate()

   const dispatch = useDispatch()
   const { auth, categories } = useSelector((state: RootStore) => state)

   const handleSubmit = (e: FormEvent) => {
       e.preventDefault()
       if(!name) return

       if(!auth.accessToken) return 

       if(edit){
         if(edit.name === name){
             setEdit(null)
             setName('')
         }else{
            const data = { ...edit, name}
            dispatch(updateCategory(data, auth.accessToken))
            setEdit(null)
            setName('')
         }
       }else{
         dispatch(createCategory(name, auth.accessToken))
         setName('')
       }
   }

   useEffect(()=> {
    if((auth.accessToken && auth.user?.role !== 'admin')) navigate('/')
   },[auth.accessToken, auth.user?.role, navigate])

   useEffect(()=> {
       if(edit){
           setName(edit.name)
       }
   },[edit])

   if((auth.accessToken && auth.user?.role !== 'admin')) return <NotFound />

  return <div className='max-w-md mx-auto my-8 min-h-full mb-4 w-full'>
      <h1 className='text-center py-4 font-bold text-lg'> Categories </h1>

      <form className='flex w-full justify-between gap-x-2 mt-4' onSubmit={handleSubmit}>
          <input type="text" name='name' placeholder='Category' className='w-full outline-none border-b border-gray-400 hover:border-gray-900'
          value={name} onChange={e => setName(e.target.value)}  autoComplete='off' />
          <button className='bg-red-400 text-gray-100 px-2 rounded-sm hover:bg-red-600 transition-all duration-300 ease-out'> {edit ? 'update': 'create'} </button>
      </form>

      <div className='my-4'>
          {
              categories.map(item => (
                  <div key={item._id} className='flex justify-between my-4 font-semibold text-lg'>
                      <h2>{item.name}</h2>

                      <span className='flex sm:gap-x-2 gap-x-4'>
                          <i className='bx bx-edit-alt text-blue-500 cursor-pointer' onClick={()=> setEdit(item)}  ></i>
                          <DeleteModal category={item} token={(auth.accessToken as string)}/>
                      </span>
                  </div>
              ))
          }
      </div>

  </div>;
}

export default Categories;
