'use client';

import React, { useState } from 'react';
import { RiCloseLine, RiMenu4Fill } from 'react-icons/ri';
import Image from 'next/image';
import Sidebar from '../sidebar/sidebar';

const Topbar = () => {
  const [showElement, setShowElement] = useState(false);

  const handleClick = () => {
    setShowElement(!showElement);
  };

  return (
    <div className='hidden max-xl:flex justify-around  mt-4'>
      <RiMenu4Fill onMouseDown={handleClick} size={24} color='black' />
      {showElement && (
        <div>
          <div className='fixed top-0 left-0 z-10'>
            <Sidebar />
            <div className='absolute top-3 right-6 z-[11]'>
              <RiCloseLine onMouseDown={handleClick} size={26} color='black' />
            </div>
          </div>
          <div className='w-full h-full fixed top-0 left-0 bg-black z-[9] opacity-35'></div>
        </div>
      )}
      <Image
        src='/orcaLogo.png'
        W
        alt='orca'
        width='160'
        height='80'
        className=' absolute '
      />
      <div>francis</div>
    </div>
  );
};

export default Topbar;
