'use client';
import React, { useState } from 'react';
import {
  MdAttachMoney,
  MdDashboard,
  MdShoppingBag,
  MdSupervisedUserCircle,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from 'react-icons/md';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import MenuLink from './menuLink/menuLink';
import Image from 'next/image';

const menuItems = [
  {
    title: 'Business',
    list: [
      {
        title: 'Daily Pacing',
        path: '/dashboard/users',
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: 'Weekly + Monthly',
        path: '/dashboard/products',
        icon: <MdShoppingBag />,
      },
    ],
  },
  {
    title: 'Channels',
    list: [
      {
        title: 'Channel Snapshot',
        path: '/dashboard/revenue',
        icon: <MdWork />,
      },
      {
        title: 'Daily Heatmaps',
        path: '/dashboard/reports',
        icon: <MdAnalytics />,
      },
      {
        title: 'Weekly + Monthly',
        path: '/dashboard/teams',
        icon: <MdPeople />,
      },
      {
        title: 'Creative + Landing Pages',
        path: '/dashboard/teams',
        icon: <MdPeople />,
      },
      {
        title: 'Google Deep Dive',
        path: '/dashboard/teams',
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: 'Deep Dives',
    list: [
      {
        title: 'Attribution',
        path: '/dashboard/settings',
        icon: <MdOutlineSettings />,
      },
      {
        title: 'Cohorts',
        path: '/dashboard/help',
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (title) => {
    setOpenMenus((prevOpenMenus) => ({
      ...prevOpenMenus,
      [title]: !prevOpenMenus[title],
    }));
  };

  return (
    <div className='sticky h-full flex flex-col justify-between'>
      <div>
        <div className='flex flex-col items-center mb-[20px]'>
          <Image
            src='/orcaLogo.png'
            alt='profile'
            width='80'
            height='80'
            className=''
          />
          <h1 className='text-[28px] text-center text-black font-bold mt-6 leading-7'>
            - Demo Company -
          </h1>
          <IoMdInformationCircleOutline className='text-black mt-5 h-6 w-5' />
        </div>
        <MenuLink
          item={{
            title: 'Snapshot',
            path: '/dashboard',
            icon: <MdDashboard />,
          }}
        />
        <ul>
          {menuItems.map((cat) => (
            <li key={cat.title}>
              {cat.title && (
                <div
                  className='flex justify-between items-center p-[10px] my-[5px] italic cursor-pointer hover:bg-[#BAB5A9] rounded-[5px] text-black text-[13px]'
                  onClick={() => toggleMenu(cat.title)}
                >
                  {cat.title}
                  <span>{openMenus[cat.title] ? '-' : '+'}</span>
                </div>
              )}
              {openMenus[cat.title] &&
                cat.list.map((item) => (
                  <MenuLink key={item.title} item={item} />
                ))}
            </li>
          ))}
        </ul>
      </div>
      <button className='p-[20px] flex items-center gap-[10px] text-black hover:bg-[#BAB5A9] my-[5px] rounded-[5px] w-full'>
        <MdLogout />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
