import React from 'react';
import Image from 'next/image';

const LoginGraphic = () => {
  return (
    <div className=' w-[100%] h-[100vh] relative flex items-center justify-center'>
      <p className='uppercase absolute top-10 left-16 text-[#fff174] font-extrabold text-[8rem] z-[10] leading-[10rem] max-xl:leading-[8rem] max-xl:text-[6rem] text-nowrap'>
        <span className='italic'> PROFITABLE</span> <br /> GROWTH <br /> STARTS
        HERE
      </p>
      <div className='w-[900px] h-[900px] max-xl:w-[650px] max-xl:h-[650px] rounded-full z-[1] bg-[#E2593B] absolute translate-y-[4rem]' />
      <div className='w-[650px] h-[650px] max-xl:w-[400px] max-xl:h-[400px] rounded-full z-[2] bg-[#BF854F] absolute translate-y-[4rem]' />
      <div className='w-[650px] h-[650px] max-xl:w-[400px] max-xl:h-[400px] rounded-full z-[3]  absolute translate-y-[4rem]  border-8 border-[#E2593B]' />
      <Image
        src='/iceberg.png'
        alt='profile'
        width='1800'
        height='2000'
        className='w-[100%] z-[2] translate-y-[8rem]'
      />
    </div>
  );
};

export default LoginGraphic;
