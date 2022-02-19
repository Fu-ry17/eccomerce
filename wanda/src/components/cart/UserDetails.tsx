import React, { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../../redux/actions/orderActions'
import { InputChange, IProducts, RootStore } from '../../utils/TypeScript'

interface IProps{
  cart: IProducts[]
}

const UserDetails: React.FC<IProps> = ({ cart }) => {
 const initialState = { location: '', notes: '', paymentMethod: ''}
 const [phone, setPhone] = useState<any>()
 const [total, setTotal] = useState(0)
 const [data, setData] = useState(initialState)
 const { location, notes, paymentMethod } = data

 const { auth } = useSelector((state: RootStore) => state)

 const paymentMethods = [
    {name: 'M-pesa'},
    {name: 'Paypal'},
    {name: 'On-Delivery'}
 ]

 const dispatch = useDispatch()

 useEffect(()=> {

    let new_total = cart.reduce((prev, item) =>{
       return prev + ((item.qty as number) * (item.price as number))
    },0)

   setTotal(new_total)
 
 },[total, cart])

 const handleInpuChange = (e: InputChange) =>{
   const { name, value} = e.target
   setData({ ...data, [name]:value})
 }

  return (
   <div className='mb-8'>

    <h1 className='font-bold text-xl pb-2'> Total: ksh {total.toFixed(2)} </h1> 
   
   <div className='grid grid-cols-1 sm:grid-cols-2 md:gap-4'>
    <div className='mb-3'>
          <PhoneInput
              country={'ke'}
              value={phone}
              onChange={phone => setPhone(phone)}
              inputProps={{
                name: 'phone',
                required: true,
                autoFocus: true
              }}
              inputClass="w-full border hover:border-gray-400 rounded-md p-2 outline-none"
          />
      </div>

      <div className='mb-3'>
            <label className='block'> Delivery Location</label>
            <input type="text" name='location' placeholder='Enter Location' value={location} onChange={handleInpuChange}
            className='w-full border hover:border-gray-400 rounded-md p-2 outline-none' />
        </div>
      </div>

      <div className='mb-3'>
            <label className='block'> Choose Payment Method</label>
            <select className='w-full border hover:border-gray-400 rounded-md p-2 outline-none lg:w-1/2'
             name='paymentMethod' value={paymentMethod} onChange={handleInpuChange}>
              <option value="">Choose Payment method</option>
              {
                paymentMethods.map((item,i) => (
                  <option key={i}>{item.name}</option>
                ))
              }
            </select>
        </div>

  
     <div className='mb-4'>
       <label className='block'> Notes</label>
       <textarea placeholder='An additional information regarding your delivery or order'
         name='notes' value={notes} onChange={handleInpuChange}
       className='w-full border hover:border-gray-400 rounded-md p-2 outline-none' rows={5} cols={5} style={{ resize: 'none'}} />
     </div>
     
     <div>
       <button className='bg-red-400 text-white py-2 md:w-1/2 px-2 w-full rounded-md' onClick={()=> dispatch(createOrder(phone, data, cart, auth, total ))}>
           Check Out (ksh: {total.toFixed(2)}) 
      </button>
     </div>
   </div>
  )
}

export default UserDetails