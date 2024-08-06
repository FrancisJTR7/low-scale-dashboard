import { IoMdInformationCircleOutline } from 'react-icons/io';
import MenuLink from './_components/menuLink';
import MenuToggle from './_components/menuToggle';
import Image from 'next/image';
import { MdDashboard, MdLogout } from 'react-icons/md';
import { logout } from '@/src/app/api/auth/logout';
import Dropdown from './_components/dropDown';
import UserSettings from './_components/userSettings';

const Sidebar = () => {
  return (
    <div className='min-w-[18rem] max-w-[18rem] h-[100vh]  bg-[#cec8bb] p-[12px] sticky top-0 flex flex-col justify-between'>
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
            path: '/snapshot',
            icon: <MdDashboard />,
          }}
        />
        <MenuToggle />
        <Dropdown />
      </div>
      <form action={logout}>
        <button
          type='submit'
          className='p-[20px] flex items-center gap-[10px] text-black hover:bg-[#BAB5A9] my-[5px] rounded-[5px] w-full'
        >
          <MdLogout />
          Logout
        </button>
      </form>
      <UserSettings />
    </div>
  );
};

export default Sidebar;
