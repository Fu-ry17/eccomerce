import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import { ALERT } from '../../redux/types/alertTypes';
import { postAPI } from '../../utils/fetchData';
import { RootStore } from '../../utils/TypeScript';

function Activate() {
  const activateToken = useParams<string>().slug
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootStore) => state)
  
  useEffect(()=>{
     if(activateToken){
         postAPI('activate', { activateToken })
           .then(res => dispatch({ type: ALERT, payload: { success: res.data.msg}}))
           .catch(error => dispatch({ type: ALERT, payload: { error: error.response.data.msg}}))
     }
  },[activateToken, dispatch])

  useEffect(()=> {
     if(auth.accessToken) navigate('/')
  },[auth.accessToken, navigate])

  if(auth.accessToken) return <NotFound />

  return <div className='min-h-[calc(100vh-4rem)] flex justify-center items-center'>

      <div className='max-w-md w-full text-center font-semibold tracking-wider'>
         <h1 className='mb-4'> Your Account has been activated!</h1>
         <Link to="/">  Home </Link>
      </div>
      
  </div>;
}

export default Activate;
