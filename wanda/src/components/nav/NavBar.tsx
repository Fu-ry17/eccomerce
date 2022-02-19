import { Avatar } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { IProducts, RootStore } from '../../utils/TypeScript';
import Menu from './Menu';

function NavBar() {
  const [ham, setHam] = useState(false)
  const { auth, cart } = useSelector((state: RootStore) => state)
  const [total, setTotal] = useState(0)

  useEffect(()=> {
    const totalItems = cart.reduce((prev: number, item: IProducts) => {
         return prev = prev + (item.qty as number)
    },0)
    setTotal(totalItems)
  },[cart])


  return <div className='bg-white fixed top-0 left-0 w-full h-16 flex items-center md:shadow-sm shadow-md z-100'>
      <div className='max-w-7xl m-auto w-full px-3 flex justify-between items-center'>
         <i className='bx bx-grid-alt text-xl font-semibold md:hidden' onClick={()=> setHam(!ham)} ></i>

          <Link to='/' className='text-lg font-bold tacking-widest'> OZGENDO </Link>

          <Menu ham={ham} setHam={setHam} />
          
          <div className='space-x-4 font-bold flex items-center'>
             <i className='bx bx-search-alt-2 text-xl cursor-pointer' ></i>

            { auth.accessToken && <div className='relative'>
                 <i className='bx bx-bell text-xl cursor-pointer font-bold'></i>
                 <p className='absolute -top-1.5 -right-1.5 animate-bounce'>0</p>
              </div> }


             { auth.user?.role !== 'admin' && <Link to="/cart" className='relative'>
                 <i className='bx bxs-cart text-xl cursor-pointer'></i>
                 <p className={`absolute -top-1.5 -right-1.5 ${total > 0 && `animate-bounce`}`}>{total}</p>
              </Link>}
            

             { auth.user ? <Link to="/profile"> <Avatar src={auth.user.avatar} size='xs' /> </Link> :
                            <Link to="/login">  <i className='bx bxs-user text-xl'></i> </Link>  }
          </div>
            
       
      </div>
  </div>;
}

export default NavBar;
