'use client';

import { usePathname } from 'next/navigation';
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from 'react-icons/md';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className='flex justify-between items-center p-[20px] rounded-[10px] bg-[#f3f1ee]'>
      <div className='font-bold text-[#b7bac1] capitalize'>
        {pathname.split('/').pop()}
      </div>
      <div className='flex items-center gap-[20px]'>
        <div className='flex items-center gap-[10px] bg-[#f3f1ee] p-[10px] rounded-[10px]'>
          <MdSearch />
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent border-none text-white'
          />
        </div>
        <div className='gap-[20px] flex'>
          <MdOutlineChat size={20} />
          <MdNotifications size={20} />
          <MdPublic size={20} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
