import React from 'react';
import { FaCaretDown } from 'react-icons/fa6';

const ProjectedRevenue = () => {
  return (
    <div className='text-black flex flex-col items-center ml-2 w-min text-nowrap'>
      <h2 className='font-extrabold text-[.75rem] '>
        This Month&apos;s Projected Revenue
      </h2>

      <div className='flex items-center leading-7 '>
        <h1 className='font-extrabold text-[1.5rem]'>$ 1,607,272</h1>
        <div className='bg-red-200 text-red-500  ml-1 flex items-center px-1 h-5 font-extrabold rounded-[4px] text-xs'>
          <FaCaretDown />
          2%
        </div>
      </div>
      <h3 className='text-[.75rem] opacity-50'>against target of $1,647,044</h3>
    </div>
  );
};

export default ProjectedRevenue;
