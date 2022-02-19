import React from 'react';
import { Spinner } from '@chakra-ui/react'

function Loading() {
  return <div className='fixed left-0 top-0 h-screen w-full flex items-center justify-center bg-gray-50 opacity-90'>
      <div className='flex flex-col items-center justify-cneter gap-y-6'>
          <Spinner size="xl" />
          <h1 className='text-black font-bold text-lg tracking-widest'> Loading...</h1>
      </div>
  </div>;
}

export default Loading;
