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
    <div>
      <div>{pathname.split('/').pop()}</div>
      <div>
        <div>
          <MdSearch />
          <input type='text' placeholder='Search...' />
        </div>
        <div>
          <MdOutlineChat />
          <MdNotifications />
          <MdPublic />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
