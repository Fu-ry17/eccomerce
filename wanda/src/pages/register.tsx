import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import NotFound from '../components/NotFound';
import { register } from '../redux/actions/authActions';
import { InputChange, RootStore } from '../utils/TypeScript';

export default function Register() {
  const initialState = { name: '', account: '', password: '', cf_password: ''}
  const [user, setUser] = useState(initialState)
  const { name, account, password, cf_password } = user

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootStore) => state)

  const handleInputChange = (e: InputChange) => {
    const { name, value} = e.target
    setUser({ ...user, [name]:value})
  }

  const handleSubmit = (e: FormEvent) =>{
      e.preventDefault()
      dispatch(register(user))
  }

  useEffect(()=>{
    if(auth.accessToken) navigate('/')
  },[auth.accessToken, navigate])

 if(auth.accessToken) return <NotFound />

  return <div className='min-h-[calc(100vh-6rem)] flex justify-center items-center'>
        <div className='w-full px-4 max-w-md'>
          <h1 className='text-center text-2xl font-bold mb-4 tracking-wider'> Sign Up</h1>

            <form onSubmit={handleSubmit}>

             <div className='mb-4'>
                 <label className='block mb-2'> username</label>
                 <input type="text" placeholder='enter your username' name='name'
                  className='w-full outline-none border-b border-gray-400 hover:border-gray-900' 
                  autoComplete='off' value={name} onChange={handleInputChange} />
              </div>

              <div className='mb-4'>
                 <label className='block mb-2'> email</label>
                 <input type="text" placeholder='enter your e-mail' name='account'
                  className='w-full outline-none border-b border-gray-400 hover:border-gray-900' 
                  autoComplete='off' value={account} onChange={handleInputChange} />
              </div>

              <div className='mb-4'>
                 <label className='block mb-2'> password</label>
                 <input type="password" placeholder='enter your password' name='password'
                   className='w-full outline-none border-b border-gray-400 hover:border-gray-900'
                   autoComplete='off' value={password} onChange={handleInputChange} />
              </div>

              <div className='mb-4'>
                 <label className='block mb-2'>confirm password</label>
                 <input type="password" placeholder='confirm your password' name='cf_password'
                   className='w-full outline-none border-b border-gray-400 hover:border-gray-900'
                   autoComplete='off' value={cf_password} onChange={handleInputChange} />
              </div>
             
              <button
                className='bg-red-400 w-full py-2 my-4 rounded-md text-white font-semibold mb-8
                            text-lg tracking-wider transition duration-300 ease-out hover:bg-red-600'> sign up
              </button>

              <Link to="/login"> Already have an account ? <span className='text-red-400 hover:text-red-600 hover:font-bold transition duration-300 ease-out'> Sign in </span></Link>
            </form>


        </div>
  </div>;
}
