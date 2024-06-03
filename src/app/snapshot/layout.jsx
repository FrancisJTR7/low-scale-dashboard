import Sidebar from '../ui/sidebar/sidebar';

const layout = ({ children }) => {
  return (
    <div className='flex h-[100vh] font-pp-object-sans'>
      <Sidebar />
      <div className='w-full p-[20px]'>{children}</div>
    </div>
  );
};

export default layout;
