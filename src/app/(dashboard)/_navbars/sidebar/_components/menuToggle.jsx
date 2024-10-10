'use client';
import React, { useState } from 'react';
import MenuLink from './menuLink';
import {
  MdShoppingBag,
  MdSupervisedUserCircle,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
} from 'react-icons/md';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

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

const MenuToggle = () => {
  const DarkMode = useSelector((state) => state.theme.darkMode);

  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (title) => {
    setOpenMenus((prevOpenMenus) => ({
      ...prevOpenMenus,
      [title]: !prevOpenMenus[title],
    }));
  };

  return (
    <ul>
      {menuItems.map((cat) => (
        <li key={cat.title}>
          {cat.title && (
            <div
              className={clsx(
                'flex justify-between items-center p-[10px] my-[5px] italic cursor-pointer hover:bg-[#AFB6C8] rounded-[5px]  text-[15px]',
                DarkMode && 'hover:bg-[#BAB5A9]'
              )}
              onClick={() => toggleMenu(cat.title)}
            >
              {cat.title}
              <span>{openMenus[cat.title] ? '-' : '+'}</span>
            </div>
          )}
          {openMenus[cat.title] &&
            cat.list.map((item) => <MenuLink key={item.title} item={item} />)}
        </li>
      ))}
    </ul>
  );
};

export default MenuToggle;
