import React, { FormEvent, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Avatar,
  Spinner,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { InputChange, IUserProfile, RootStore } from '../../utils/TypeScript';
import NotFound from '../NotFound';
import Loading from '../alert/Loading';
import { validImage } from '../../utils/imageUpload';
import { ALERT } from '../../redux/types/alertTypes';
import { updatePassword, updateUser } from '../../redux/actions/userActions';



const EditProfileModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialState = { account:'',name: '', password: '', cf_password: '', avatar: ''}
  const [user, setUser] = useState<IUserProfile>(initialState)
  const { name, password, cf_password, avatar } = user


  const { auth, alert } = useSelector(( state: RootStore) => state)
  const dispatch = useDispatch()

  if(!auth.accessToken) return <NotFound />

  if(!auth.user) return <Loading />

  const handleInputChange = (e: InputChange) => {
    const { name, value} = e.target
    setUser({ ...user, [name]:value})
  }

  const handleImage = (e: InputChange) => {
       const target = e.target as HTMLInputElement
       const files = target.files

       if(files){
         const file = files[0]
         const check = validImage(file)

         if(check) return dispatch({ type: ALERT, payload: {error: check.msg }})
         setUser({...user, avatar: (file as File)})
       }
  }

  const handleSubmit = (e: FormEvent) =>{
    e.preventDefault()
    if(name || avatar) dispatch(updateUser(name, (avatar as File), auth))
    if(password && auth.accessToken) dispatch(updatePassword(password, cf_password, auth.accessToken))
  }


  return (
    <div className='mt-18'>
      <button onClick={onOpen} className='w-full my-2 border border-gray-400 px-3 py-2 tracking-wider hover:shadow-md rounded-md'>Edit Profile</button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader><h1 className='font-bold text-xl uppercase'> OZGENDO </h1></ModalHeader>
          <ModalCloseButton />
          <ModalBody>

          <form>

            <div className='flex flex-col items-center justify-center'>

                <Avatar src={avatar ? URL.createObjectURL(avatar as File) : auth.user.avatar} size="2xl" />
                <div>
                  <label htmlFor="file" className='mb-2'>upload avatar</label>
                  <input type="file" name='file' id='file' accept='image/*' onChange={handleImage} className="hidden"/>
                </div>
            </div>

            <div className='mb-4'>
                <input type="text" placeholder='enter your username' name='name'
                className='w-full outline-none border-b border-gray-400 hover:border-gray-900' 
                autoComplete='off' defaultValue={auth.user.name} onChange={handleInputChange} />
            </div>

            <div className='mb-4'>
                <input type="text" placeholder='enter your e-mail' name='account'
                className='w-full outline-none border-b border-gray-400 hover:border-gray-900' 
                autoComplete='off' value={auth.user.account} disabled/>
            </div>

            <div className='mb-4'>
                <input type="password" placeholder='new password' name='password'
                  className='w-full outline-none border-b border-gray-400 hover:border-gray-900'
                  autoComplete='off' value={password} onChange={handleInputChange} />
            </div>

            <div className='mb-4'>
                <input type="password" placeholder='confirm password' name='cf_password'
                  className='w-full outline-none border-b border-gray-400 hover:border-gray-900'
                  autoComplete='off' value={cf_password} onChange={handleInputChange} />
            </div>

            <div className='flex justify-between my-8'>
               <span></span>
               {
                 alert.loading ? <Spinner /> :  <Button variant='ghost' type='submit' onClick={handleSubmit}>Update</Button> 
               } 
            </div>

            </form>
             
          </ModalBody>

        </ModalContent>
      </Modal>
    </div>
  )
}

export default EditProfileModal