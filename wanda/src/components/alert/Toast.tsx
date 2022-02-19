import React, { useEffect } from 'react';
import { useToast } from '@chakra-ui/react'
import { ALERT, IAlert } from '../../redux/types/alertTypes';
import { useDispatch } from 'react-redux';

interface Iprops{
    alert: IAlert
}

const Toast: React.FC<Iprops> = ({ alert }) => {
    const toast = useToast()

    const dispatch = useDispatch()

    useEffect(()=>{
        toast({
            title: 'Fury Store',
            description: alert.error ? alert.error : alert.success,
            status: alert.success ? 'success' : 'error',
            duration: 5000,
            isClosable: true,
          })
          
          if(alert.error){
            setTimeout(()=>{
               dispatch({ type: ALERT, payload: {} })
            },500)
          }  
    },[alert.error, alert.success, dispatch, toast])

  
    return (
       <h1 className='hidden'> Hello </h1>
    )
  }
export default Toast;
