import Sidebar from '../components/sidebar/sidebar';

const layout = ({ children }) => {
  return (
    <div className='flex font-pp-object-sans justify-center'>
      <Sidebar />
      <div className='w-[95%] max-xl:w-full overflow-x-hidden'>{children}</div>
    </div>
  );
};

export default layout;
