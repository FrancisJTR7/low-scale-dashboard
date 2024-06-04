import clsx from 'clsx';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6';

const kpiItems = [
  {
    title: 'Spend',
    value: '$152,164',
    change: '3%',
    positive: true,
  },
  {
    title: 'New Revenue',
    value: '$377,715',
    change: '1%',
    positive: false,
  },
  {
    title: 'CAC',
    value: '$69',
    change: '21%',
    positive: false,
  },
  {
    title: 'Return Revenue',
    value: '$210,654',
    change: '5%',
    positive: false,
  },
  {
    title: 'Total Revenue',
    value: '$588,369',
    change: '3%',
    positive: false,
  },
  {
    title: 'bROAS',
    value: '387%',
    change: '6%',
    positive: false,
  },
];
const Kpi = () => {
  return (
    <div className='space-y-2 w-[20rem] h-min'>
      {kpiItems.map((item, index) => (
        <div key={index} className='text-center p-4 bg-[#F3F1EE] rounded-lg'>
          <div className='text-[.8rem] font-extrabold text-black'>
            {item.title}
          </div>
          <div className='flex justify-center items-center gap-2'>
            <div className='text-2xl font-extrabold text-black'>
              {item.value}
            </div>
            <div
              className={clsx(
                'flex items-center px-1 h-5 font-extrabold rounded-md text-xs',
                {
                  'text-green-500 bg-green-200': item.positive,
                  'text-red-500 bg-red-200': !item.positive,
                }
              )}
            >
              {item.positive ? <FaCaretUp /> : <FaCaretDown />}
              {item.change}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Kpi;
