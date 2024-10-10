'use client';

import React, { useState, useEffect } from 'react';
import { RiCloseLine, RiMenu4Fill } from 'react-icons/ri';
import Image from 'next/image';
import Sidebar from '../sidebar/sidebar';
import { useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

const Topbar = ({
  userInfo,
  companyInfo,
  portfolioList,
  tableIdentifier,
  hdyhau,
}) => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const selectedCompany = useSelector(
    (state) => state.company.selectedCompanyName
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    // Cache the data with longer cache time and stale time
    queryClient.setQueryData(
      'userData',
      {
        userInfo,
        companyInfo,
        portfolioList,
        tableIdentifier,
        hdyhau,
      },
      {
        staleTime: 1000 * 60 * 60, // 1 hour stale time, meaning it wont refetch for another hr
        cacheTime: 1000 * 60 * 60 * 6, // 6 hour cache time, meaning the data is stored for 6 hours
      }
    );
  }, [
    queryClient,
    userInfo,
    companyInfo,
    portfolioList,
    tableIdentifier,
    hdyhau,
  ]);

  const [showElement, setShowElement] = useState(false);
  const handleClick = () => {
    setShowElement(!showElement);
  };

  return (
    <div
      className={clsx(
        'h-14 hidden max-xl:flex bg-beige',
        darkMode && 'bg-stone text-orcgray'
      )}
    >
      <div
        className={clsx(
          'fixed top-0 left-0 right-0 mx-0 z-10 h-[5rem] pt-2 px-24 max-md:px-12 backdrop-blur-[7px] bg-beige/85 ',
          darkMode && 'bg-stone/85 '
        )}
      >
        <div className='flex justify-between items-center mt-2'>
          <RiMenu4Fill
            onMouseDown={handleClick}
            size={32}
            className={clsx(
              'cursor-pointer text-black',
              darkMode && 'text-white '
            )}
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
            src={darkMode ? '/orcaLogoGreen.png' : '/orcaLogo.png'}
            alt='orca'
            width='140'
            height='60'
            className='absolute top-3 left-0 right-0 mx-auto'
          />
          <div>
            <h1
              className={clsx(
                'text-[24px] text-center  font-bold leading-7 absolute right-5 top-5 text-nowrap max-sm:hidden',
                darkMode && 'text-white'
              )}
            >
              {selectedCompany}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
