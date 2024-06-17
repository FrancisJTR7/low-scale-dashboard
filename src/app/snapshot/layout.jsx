import Sidebar from '../components/sidebar/sidebar';
import Topbar from '../components/topbar/topbar';

const layout = ({ children }) => {
  return (
    <div className='flex font-pp-object-sans justify-center max-xl:flex-col'>
      <div className='max-xl:hidden'>
        <Sidebar />
      </div>
      <Topbar />
      <div className='w-[95%] max-xl:w-full overflow-x-hidden'>{children}</div>
    </div>
  );
};

export default layout;
