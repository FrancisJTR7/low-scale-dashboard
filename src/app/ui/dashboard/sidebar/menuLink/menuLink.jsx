'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const MenuLink = ({ item }) => {
  const pathname = usePathname();

  return (
    <Link
      href={item.path}
      className={clsx(
        'p-[20px] flex items-center gap-[10px] hover:bg-[#2e374a] my-[5px] rounded-[10px]',
        { 'bg-[#2e374a]': pathname === item.path }
      )}
    >
      {item.icon}
      {item.title}
    </Link>
  );
};

export default MenuLink;
