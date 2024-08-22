'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { MdLogout } from 'react-icons/md';
import { logout } from '@/src/app/api/auth/logout';

const UserSettings = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const queryClient = useQueryClient();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = await queryClient.getQueryData('userData');
      if (cachedData) {
        setUserInfo(cachedData.userInfo);
      }
      setLoading(false);
    };

    fetchData();

    const interval = setInterval(() => {
      const data = queryClient.getQueryData('userData');
      if (data && !userInfo) {
        setUserInfo(data.userInfo);
        setLoading(false);
        clearInterval(interval);
      }
    }, 1); // Check every .005s for updated data

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [queryClient, userInfo]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='relative' ref={menuRef}>
      <div
        className='flex items-center cursor-pointer'
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className='rounded-full w-12 h-12 text-center flex items-center justify-center bg-green-200 text-green-800 font-bold text-lg'>
          FT
        </div>
        <div className='pl-3'>
          <div className={clsx('font-bold', darkMode && 'text-white')}>
            {userInfo?.first_name} {userInfo?.last_name}
          </div>
          <div className='font-[400]'>{userInfo?.email}</div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className={clsx(
            'absolute right-0 bottom-full mb-2 w-full  border border-gray-200 rounded-lg shadow-lg',
            darkMode && ' text-white bg-stone border-orcgray'
          )}
        >
          <ul className='py-2'>
            <form action={logout}>
              <button
                type='submit'
                className={clsx(
                  'p-[20px] flex items-center gap-[10px] hover:bg-[#BAB5A9]  rounded-[5px] w-full',
                  darkMode && 'bg-stone hover:bg-bluestone'
                )}
              >
                <MdLogout />
                Logout
              </button>
            </form>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserSettings;
