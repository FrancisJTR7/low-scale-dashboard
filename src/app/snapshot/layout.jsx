import Sidebar from '../components/sidebar/sidebar';

const layout = ({ children }) => {
  return (
    <div className='flex font-pp-object-sans'>
      <Sidebar />
      <div className='w-[95%] overflow-x-hidden '>{children}</div>
    </div>
  );
};

export default layout;
