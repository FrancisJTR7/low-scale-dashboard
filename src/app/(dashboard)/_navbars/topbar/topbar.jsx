'use client';

import React, { useState, useEffect } from 'react';
import { RiCloseLine, RiMenu4Fill } from 'react-icons/ri';
import Image from 'next/image';
import Sidebar from '../sidebar/sidebar';
import { useQueryClient } from '@tanstack/react-query';

const Topbar = ({ userInfo, companyInfo, portfolioList, tableIdentifier }) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Cache the data
    queryClient.setQueryData('userData', {
      userInfo,
      companyInfo,
      portfolioList,
      tableIdentifier,
    });
  }, [queryClient, userInfo, companyInfo, portfolioList, tableIdentifier]);

  const [showElement, setShowElement] = useState(false);
  const handleClick = () => {
    setShowElement(!showElement);
  };

  return (
    <div className='h-14 hidden max-xl:flex bg-gradient-to-t'>
      <div className='fixed top-0 left-0 right-0 mx-0 z-10 h-[5rem] pt-2 px-24 max-md:px-12 backdrop-blur-[7px] bg-[#cec8bb]/85 '>
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
              <div className='w-full h-[100vh] fixed top-0 left-0 bottom-0 bg-black z-[9] opacity-35'></div>
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
