import Sidebar from '../ui/sidebar/sidebar';

const layout = ({ children }) => {
  return (
    <div className='flex  w-[100vw] font-pp-object-sans'>
      <Sidebar />
      <div className='w-full'>{children}</div>
    </div>
  );
};

export default layout;
