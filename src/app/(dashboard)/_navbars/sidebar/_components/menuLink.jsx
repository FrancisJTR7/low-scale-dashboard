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
        'p-[10px] flex items-center gap-[10px] text-black text-[13px] italic hover:bg-[#BAB5A9] my-[5px] rounded-[5px]',
        DarkMode && 'hover:bg-bluestone',
        { 'bg-[#AFB6C8]': pathname === item.path }
      )}
    >
      {item.icon}
      {item.title}
    </Link>
  );
};

export default MenuLink;
