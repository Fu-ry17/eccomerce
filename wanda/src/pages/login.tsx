import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import NotFound from '../components/NotFound';
import { login } from '../redux/actions/authActions';
import { InputChange, RootStore } from '../utils/TypeScript';

export default function Login() {
  const initialState = { account: '', password: ''}
  const [user, setUser] = useState(initialState)
  const { account, password} = user

  const navigate = useNavigate()
  // work on locations redirects
  // const location = useLocation()

  // console.log(location.search)

  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootStore) => state)

  const handleInputChange = (e: InputChange) => {
    const { name, value} = e.target
    setUser({ ...user, [name]:value})
  }

  const handleSubmit = (e: FormEvent) =>{
      e.preventDefault()
      dispatch(login(user))
  }

  useEffect(()=>{
     if(auth.accessToken) navigate('/')
  },[auth.accessToken, navigate])

  if(auth.accessToken) return <NotFound />

  return <div className='min-h-[calc(100vh-4rem)] flex justify-center items-center'>
        <div className='w-full px-4 max-w-md'>
          <h1 className='text-center text-2xl font-bold mb-4 tracking-wider'> Sign In</h1>

            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                 <label className='block mb-1'> email</label>
                 <input type="text" placeholder='enter your e-mail' name='account'
                  className='w-full outline-none border-b border-gray-400 hover:border-gray-900' 
                  autoComplete='off' value={account} onChange={handleInputChange} />
              </div>

              <div className='mb-4'>
                 <label className='block mb-1'> password</label>
                 <input type="password" placeholder='enter your password' name='password'
                   className='w-full outline-none border-b border-gray-400 hover:border-gray-900'
                   autoComplete='off' value={password} onChange={handleInputChange} />
              </div>
             
             <span className='w-full flex justify-end my-4 hover:font-semibold'>
                <Link to="/forgot"> forgot password? </Link>
             </span>

              <button disabled={(!account && !password)}
                className='bg-red-400 w-full py-2 my-4 rounded-md text-white font-semibold mb-8
                            text-lg tracking-wider transition duration-300 ease-out hover:bg-red-600'> sign in
              </button>

              <Link to="/register"> Don't have an account ? <span className='text-red-400 hover:text-red-600 hover:font-bold transition duration-300 ease-out'> Sign Up </span></Link>
            </form>


        </div>
  </div>;
}
