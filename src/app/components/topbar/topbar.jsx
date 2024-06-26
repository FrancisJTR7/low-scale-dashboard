'use client';

import React, { useState } from 'react';
import { RiCloseLine, RiMenu4Fill } from 'react-icons/ri';
import Image from 'next/image';
import Sidebar from '../sidebar/sidebar';

const Topbar = () => {
  // State to toggle the sidebar
  const [showElement, setShowElement] = useState(false);
  // Function to toggle the sidebar
  const handleClick = () => {
    setShowElement(!showElement);
  };

  return (
    <div className='h-14 hidden max-xl:flex bg-gradient-to-t'>
      <div className='fixed top-0 left-0 right-0 mx-0 z-10 h-[6.5rem] pt-2 px-24 max-md:px-12 bg-gradient-to-b from-[#cec8bb] via-[#cec8bb] via-60% to-[rgba(206,200,187,.0)] '>
        <div className='flex justify-between items-center mt-2'>
          <RiMenu4Fill
            onMouseDown={handleClick}
            size={32}
            color='black'
            className='cursor-pointer'
          />
          {/* Sidebar component */}
          {showElement && (
            <div>
              <div className='fixed top-0 left-0 z-10'>
                <Sidebar />
                <div className='absolute top-[.35rem] right-6 z-[11]'>
                  <RiCloseLine
                    onMouseDown={handleClick}
                    size={36}
                    color='black'
                    className='cursor-pointer'
                  />
                </div>
              </div>
              <div className='w-full h-full fixed top-0 left-0 bg-black z-[9] opacity-35'></div>
            </div>
          )}
          <Image
            src='/orcaLogo.png'
            W
            alt='orca'
            width='140'
            height='60'
            className='absolute top-3 left-0 right-0 mx-auto'
          />
          <div>francis</div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
