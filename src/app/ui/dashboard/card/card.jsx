import { MdSupervisedUserCircle } from 'react-icons/md';

const Card = () => {
  return (
    <div className='bg-[#182237] p-[20px] rounded-[10px] flex gap-[20px] cursor-pointer w-full hover:bg-[#2e374a]'>
      <MdSupervisedUserCircle size={24} />
      <div className='flex gap-[20px] flex-col'>
        <span>Total Users</span>
        <span className='font-bold text-[24px] '> 10.543</span>
        <span className='font-light text-[14px]'>12% more than previously</span>
      </div>
    </div>
  );
};

export default Card;
