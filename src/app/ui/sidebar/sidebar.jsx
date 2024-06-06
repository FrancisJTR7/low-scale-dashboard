import { IoMdInformationCircleOutline } from 'react-icons/io';
import MenuLink from './menuLink/menuLink';
import MenuToggle from './menuToggle/menuToggle';
import Image from 'next/image';
import { MdDashboard, MdLogout } from 'react-icons/md';

const Sidebar = () => {
  return (
    <div className='min-w-[16rem] p-[12px] sticky top-0 h-full flex flex-col justify-between'>
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
      </div>
      <button className='p-[20px] flex items-center gap-[10px] text-black hover:bg-[#BAB5A9] my-[5px] rounded-[5px] w-full'>
        <MdLogout />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
