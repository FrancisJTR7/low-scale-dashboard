'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

const MenuLink = ({ item }) => {
  const DarkMode = useSelector((state) => state.theme.darkMode);

  const pathname = usePathname();

  return (
    <Link
      href={item.path}
      className={clsx(
        'p-[10px] flex items-center gap-[10px] text-black text-[15px] italic hover:bg-[#283454] my-[5px] rounded-[5px]',
        DarkMode && 'hover:bg-[#3a3e42] text-orcgray',
        {
          [DarkMode ? 'bg-[#283454] text-white' : 'bg-[#AFB6C8]']:
            pathname === item.path,
        }
      )}
    >
      {item.icon}
      {item.title}
    </Link>
  );
};

export default MenuLink;
