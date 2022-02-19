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
import { ICategory } from '../../utils/TypeScript';
import { deleteCategory } from '../../redux/actions/categoryActions';

interface IProps{
    token: string
    category: ICategory
}

const DeleteModal: React.FC<IProps> = ({ category, token }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()

  return (
    <div className='mt-18'>
       <p className='flex items-center justify-center cursor-pointer hover:font-bold' 
          onClick={onOpen}>  <i className='bx bx-trash text-red-500 cursor-pointer'></i> </p>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader><h1 className='font-bold text-xl uppercase'> OZGENDO </h1></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
             <h2 className='font-semibold tracking-wide text-lg'> Are you sure you want to delete ? <span className='font-bold'>{category.name}</span></h2>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' onClick={()=> dispatch(deleteCategory(category._id, token ))} onClose={onClose}>Yes</Button>
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

export default DeleteModal