import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authActions';

interface IProps{
  name?: string
}

const LogoutModal: React.FC<IProps> = ({ name }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()

  return (
    <div className='mt-18'>
       <p className='flex items-center justify-center cursor-pointer hover:font-bold' 
          onClick={onOpen}> logout {name} <i className='bx bx-log-out-circle px-2 font-bold'></i></p>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader><h1 className='font-bold text-xl uppercase'> OZGENDO </h1></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
             <h2 className='font-semibold tracking-wide text-lg'> Are you sure you want to logout ? <span className='font-bold'> {name }</span></h2>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' onClick={()=> dispatch(logout())} onClose={onClose}>Yes</Button>
            <div className='px-2'></div>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              No
            </Button>
          </ModalFooter>

        </ModalContent>
      </Modal>
    </div>
  )
}

export default LogoutModal
