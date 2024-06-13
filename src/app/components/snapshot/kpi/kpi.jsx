'use client';

import clsx from 'clsx';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6';

const kpiItems = [
  {
    title: 'Spend',
    value: '$152,164',
    change: 0.03,
    positive: true,
  },
  {
    title: 'New Revenue',
    value: '$377,715',
    change: -0.01,
    positive: true,
  },
  {
    title: 'CAC',
    value: '$69',
    change: 0.21,
    positive: false,
  },
  {
    title: 'Return Revenue',
    value: '$210,654',
    change: 0.05,
    positive: true,
  },
  {
    title: 'Total Revenue',
    value: '$588,369',
    change: -0.03,
    positive: true,
  },
  {
    title: 'bROAS',
    value: '387%',
    change: -0.06,
    positive: true,
  },
];

const getMetricColor = (change, positive) => {
  if (positive) {
    if (change >= 0) {
      return 'positive';
    } else if (change < -0.05) {
      return 'negative';
    } else {
      return 'neutral';
    }
  } else {
    if (change <= 0) {
      return 'positive';
    } else if (change > 0.05) {
      return 'negative';
    } else {
      return 'neutral';
    }
  }
};

const formatChange = (change) => {
  return `${Math.abs(change) * 100}%`;
};

const Kpi = () => {
  return (
    <div className='space-y-2.5 w-[15rem]'>
      {kpiItems.map((item, index) => (
        <div key={index} className='text-center p-4 bg-[#F3F1EE] rounded-xl'>
          <div className='text-[.8rem] font-bold text-black'>{item.title}</div>
          <div className='flex justify-center items-center gap-2'>
            <div className='text-2xl font-extrabold text-black'>
              {item.value}
            </div>
            <div
              className={clsx(
                'flex items-center px-1 h-5 font-extrabold rounded-[4px] text-xs',
                {
                  'text-green-500 bg-green-200':
                    getMetricColor(item.change, item.positive) === 'positive',
                  'text-yellow-500 bg-yellow-100':
                    getMetricColor(item.change, item.positive) === 'neutral',
                  'text-red-500 bg-red-200':
                    getMetricColor(item.change, item.positive) === 'negative',
                }
              )}
            >
              {item.change >= 0 ? <FaCaretUp /> : <FaCaretDown />}
              {formatChange(item.change)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Kpi;
