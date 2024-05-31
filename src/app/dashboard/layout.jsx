import Sidebar from '../ui/dashboard/sidebar/sidebar';
import Navbar from '../ui/dashboard/navbar/navbar';

const layout = ({ children }) => {
  return (
    <div className='flex'>
      <div className='flex-[1.2] p-[12px]'>
        <Sidebar />
      </div>
      <div className='flex-[4] p-[20px]'>
        <Navbar /> {children}
      </div>
    </div>
  );
};

export default layout;
