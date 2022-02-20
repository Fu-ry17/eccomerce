import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootStore } from '../../utils/TypeScript';
import LogoutModal from '../modals/LogoutModal';

interface Iprops{
    ham: boolean
    setHam: (ham: boolean) => void
}

const Menu: React.FC<Iprops> = ({ ham, setHam }) => {

    const [data, setData] = useState(false)
    const { auth } = useSelector((state: RootStore) => state )

   const bfLogin = [
       { name: 'Shop', path: '/'},
       { name: 'Sign in', path: '/login'}
   ]

   const usrLogin = [
        { name: 'shop', path: '/'},
   ]

   const adminRoutes = [
        { name: 'Dashboard', path: '/'},
        { name: 'Products', path: '/products'},
        { name: 'Categories', path: '/categories'},
        { name: 'Orders', path: '/orders'}
   ]

   const navLinks = auth.accessToken ? auth.user?.role === 'admin' ? adminRoutes : usrLogin : bfLogin

   useEffect(()=>{
      window.addEventListener('resize', ()=> {
          if(window.innerWidth >= 768){
             setData(true)
             localStorage.setItem('ham', 'true')
          }else{
             setData(false)
             localStorage.removeItem('ham')
          }
      })
   },[])

   useEffect(()=> {
       const show = localStorage.getItem('ham')
       if(show) {
           setData(true)
       }else{
           setData(false)
       }
   },[])


  return <div className={ data ? 'md:w-full md:flex md:justify-end md:items-center md:px-8 md:shadow-none bg-white': 
                                 `fixed ${ham ? 'left-0' : '-left-full' } top-16 w-8/12 shadow-md h-full bg-white pt-8 transition duration-500 ease-in-out z-100`}>
     {
         navLinks.map((item, i) => (
             <NavLink key={i} to={item.path} className="flex px-4 hover:font-bold transition duration-300 ease-out mb-8 md:mb-0" onClick={()=> setHam(false)}>
                 {item.name}
            </NavLink>
         ))
     }

     { auth.accessToken && 
         <span className='fixed bottom-0 p-4 font-semibold md:hidden'>
           <LogoutModal name={auth.user?.name}/>
        </span>
      }
  </div>;
}

export default Menu;
