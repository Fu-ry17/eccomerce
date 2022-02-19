import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom'
import Alert from './components/alert/Alert';
import NavBar from './components/nav/NavBar';
import Notification from './components/Notification';
import PageRender from './PageRender';
import Shop from './pages/shop'


import { refreshToken } from './redux/actions/authActions';
import { getCategories } from './redux/actions/categoryActions';
import { getAllProducts, getShopProducts } from './redux/actions/productActions';
import { GET_CART } from './redux/types/cartTypes';
import { RootStore } from './utils/TypeScript';


export default function App() {
  const dispatch = useDispatch()
  const { cart} = useSelector((state: RootStore) => state)

  useEffect(()=> {
    const check = localStorage.getItem('cart')
    const loaded = JSON.parse((check as string))
    if(loaded){
      dispatch({ type: GET_CART, payload: loaded })
    }
  },[dispatch])

  useEffect(()=> {
     dispatch(getShopProducts())
     dispatch(getCategories())
     dispatch(refreshToken())
     dispatch(getAllProducts())
  },[dispatch])

  useEffect(()=>{
    const new_item = JSON.stringify(cart)
    localStorage.setItem('cart', new_item)
  },[cart])


  return <div className='font-poppins bg-white'>
    <main className='lg:max-w-7xl m-auto px-3 mt-16 min-h-[calc(100vh-4rem)] bg-white'>
      <NavBar />
      <Alert />
      {/* <Notification /> */}
      <Routes>
        <Route path="/" element={<Shop />}/>
        <Route path="/:page" element={<PageRender />}/>
        <Route path="/:page/:slug" element={<PageRender />}/>
      </Routes>
    </main>
  </div>;
}
