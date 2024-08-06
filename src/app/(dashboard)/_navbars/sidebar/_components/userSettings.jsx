'use client';
import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const UserSettings = () => {
  const queryClient = useQueryClient();

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cachedData = queryClient.getQueryData('userData');
    if (cachedData) {
      setUserInfo(cachedData.userInfo);
    }
    setLoading(false);
  }, [queryClient]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex items-center'>
      <div className='rounded-full w-12 h-12 text-center flex items-center justify-center bg-green-300 text-green-600 font-bold text-lg'>
        FT
      </div>
      <div className='pl-3'>
        <div className='text-black font-bold'>
          {userInfo.first_name} {userInfo.last_name}
        </div>
        <div className='text-gray-600 font-[400]'>{userInfo.email}</div>
      </div>
    </div>
  );
};

export default UserSettings;
