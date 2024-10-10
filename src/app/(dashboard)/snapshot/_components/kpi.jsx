'use client';

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6';
import { useQueryClient } from '@tanstack/react-query';
import useBigQueryData from '../../../hooks/useFetchData';
import { useSelector } from 'react-redux';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 640);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}

const formatChange = (change) => {
  return `${(Math.abs(change) * 100).toFixed(0)}%`;
};

const formatNumber = (number, isMobile) => {
  return `$${new Intl.NumberFormat('en-US', {
    notation: isMobile ? 'compact' : 'standard',
    minimumFractionDigits: 0,
    maximumFractionDigits: isMobile ? 2 : 0,
  }).format(number)}`;
};

const formatValue = (item, isMobile) => {
  if (item.title === 'bROAS') {
    // Assuming bROAS is a decimal like 0.35 for 35%
    return `${(item.value * 100).toFixed(isMobile ? 2 : 0)}%`;
  } else {
    return formatNumber(item.value, isMobile);
  }
};

const Kpi = () => {
  // const queryClient = useQueryClient();
  // const [tableIdentifier, setTableIdentifier] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const cachedData = queryClient.getQueryData('userData');
  //   if (cachedData) {
  //     setTableIdentifier(cachedData.tableIdentifier);
  //   }
  // }, [queryClient]);

  const isMobile = useIsMobile();

  const selectedTableIdentifier = useSelector(
    (state) => state.company.selectedTableIdentifier
  );

  const darkMode = useSelector((state) => state.theme.darkMode);

  const { startDate, endDate } = useSelector((state) => state.selectedDates);

  const { data, isLoading } = useBigQueryData(
    selectedTableIdentifier,
    'kpi',
    startDate,
    endDate,
    {
      staleTime: 1000 * 60 * 60, // 1 hour stale time, meaning it wont refetch for another hr
      cacheTime: 1000 * 60 * 60 * 6, // 6 hour cache time, meaning the data is stored for 6 hours
    }
  );

  // Handle loading state by returning a placeholder or empty data
  const kpiItems =
    isLoading || !data || data.length === 0
      ? [
          { title: 'Spend', value: null, change: null, positive: true },
          { title: 'New Revenue', value: null, change: null, positive: true },
          { title: 'CAC', value: null, change: null, positive: false },
          {
            title: 'Return Revenue',
            value: null,
            change: null,
            positive: true,
          },
          { title: 'Total Revenue', value: null, change: null, positive: true },
          { title: 'bROAS', value: null, change: null, positive: true },
        ]
      : data && data.length > 0
      ? [
          {
            title: 'Spend',
            value: data[0].aggregate_actual_spend,
            change: data[0].delta_aggregate_spend,
            positive: true,
          },
          {
            title: 'New Revenue',
            value: data[0].aggregate_actual_new_revenue,
            change: data[0].delta_aggregate_new_revenue,
            positive: true,
          },
          {
            title: 'CAC',
            value: data[0].aggregate_actual_cac,
            change: data[0].delta_aggregate_cac,
            positive: false,
          },
          {
            title: 'Return Revenue',
            value: data[0].aggregate_actual_return_revenue,
            change: data[0].delta_aggregate_return_revenue,
            positive: true,
          },
          {
            title: 'Total Revenue',
            value: data[0].aggregate_actual_total_revenue,
            change: data[0].delta_aggregate_total_revenue,
            positive: true,
          },
          {
            title: 'bROAS',
            value: data[0].aggregate_actual_broas,
            change: data[0].delta_aggregate_broas,
            positive: true,
          },
        ]
      : [];

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

  return (
    <div
      className={clsx(
        'space-y-2.5 w-[15rem] max-md:w-full flex flex-wrap items-center justify-between max-md:space-y-0 max-md:gap-y-4',
        {
          'opacity-50 grayscale pointer-events-none':
            isLoading || !data || data.length === 0,
        }
      )}
    >
      {kpiItems.map((item, index) => (
        <div
          key={index}
          className={clsx(
            'text-center p-4 bg-[#F3F1EE] rounded-xl max-md:w-[32%] max-sm:w-[48.5%] w-full',
            darkMode && 'bg-bluestone text-white'
          )}
        >
          <div className='text-[.8rem] font-bold '>{item.title}</div>
          <div className='flex justify-center items-center gap-2'>
            <div className='text-2xl font-extrabold max-sm:text-xl '>
              {item.value !== null ? formatValue(item, isMobile) : '...'}
            </div>
            <div
              className={clsx(
                'flex items-center px-1 h-5 font-black rounded-[4px] text-xs',
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
              {item.change !== null ? (
                <>
                  {item.change >= 0 ? <FaCaretUp /> : <FaCaretDown />}
                  {formatChange(item.change)}
                </>
              ) : (
                '...'
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Kpi;
