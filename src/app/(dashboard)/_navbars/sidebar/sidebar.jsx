'use client';

import { IoMdInformationCircleOutline } from 'react-icons/io';
import MenuLink from './_components/menuLink';
import MenuToggle from './_components/menuToggle';
import Image from 'next/image';
import { MdDashboard, MdLogout } from 'react-icons/md';
import { logout } from '@/src/app/api/auth/logout';
import Dropdown from './_components/dropDown';
import UserSettings from './_components/userSettings';
import { Switch } from '../../../ui/switch';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

const Sidebar = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const selectedCompany = useSelector(
    (state) => state.company.selectedCompanyName
  );

  return (
    <div
      className={clsx(
        'min-w-[18rem] max-w-[18rem] h-[100vh] bg-beige p-[12px] sticky top-0 flex flex-col justify-between text-black',
        darkMode && 'bg-stone text-orcgray'
      )}
    >
      <div>
        <div className='flex flex-col items-center mb-[20px]'>
          <Image
            src={darkMode ? '/orcaLogoGreen.png' : '/orcaLogo.png'}
            alt='profile'
            width='80'
            height='23'
            className=''
          />
          <h1
            className={clsx(
              'text-[28px] text-center font-bold mt-6 leading-7 ',
              darkMode && 'text-white'
            )}
          >
            {selectedCompany}
          </h1>
          <IoMdInformationCircleOutline className=' mt-5 h-6 w-5' />
        </div>
        <MenuLink
          item={{
            title: 'Snapshot',
            path: '/snapshot',
          }}
        />
        <MenuToggle />
        <Dropdown />
        <div className='flex items-center space-x-2  mt-4'>
          <Switch id='dark-mode-switch' />
          <div className={clsx('font-extrabold', darkMode && 'hidden')}>
            Light Mode
          </div>
          <div
            className={clsx('font-extrabold text-white', !darkMode && 'hidden')}
          >
            Dark Mode
          </div>
        </div>
      </div>

      <UserSettings />
    </div>
  );
};

export default Sidebar;
