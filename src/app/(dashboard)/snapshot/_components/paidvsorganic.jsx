'use client';

import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import useBigQueryData from '../../../hooks/useFetchData';
import clsx from 'clsx';

const Paidvsorganic = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const selectedTableIdentifier = useSelector(
    (state) => state.company.selectedTableIdentifier
  );

  let hdyhau = useSelector((state) => state.company.hdyhau?.toLowerCase());

  const { startDate, endDate } = useSelector((state) => state.selectedDates);

  // Pass hdyhau as an argument when calling the useBigQueryData hook
  const { data, isLoading } = useBigQueryData(
    selectedTableIdentifier,
    'paidVsOrganic',
    startDate,
    endDate,
    hdyhau,
    {
      staleTime: 1000 * 60 * 60, // 1 hour stale time, meaning it wont refetch for another hr
      cacheTime: 1000 * 60 * 60 * 6, // 6 hour cache time, meaning the data is stored for 6 hours
    }
  );

  if (hdyhau === 'knocommerce') {
    hdyhau = 'none';
  }

  // Categorize the responses as "Paid" or "Organic"-
  const categorizeResponse = (response) => {
    const lowerResponse = response.toLowerCase();
    if (
      lowerResponse.includes('facebook') ||
      lowerResponse.includes('instagram') ||
      lowerResponse.includes('google') ||
      lowerResponse.includes('youtube') ||
      lowerResponse.includes('paid')
    ) {
      return 'Paid';
    }
    return 'Organic';
  };

  const totalCounts =
    isLoading || !data
      ? { Paid: 0, Organic: 0 } // No data during loading
      : data.reduce(
          (acc, item) => {
            const category = categorizeResponse(item.response);
            acc[category] = (acc[category] || 0) + (parseInt(item.count) || 0);
            return acc;
          },
          { Paid: 0, Organic: 0 }
        );

  const totalResponses = totalCounts.Paid + totalCounts.Organic;

  // Calculate the percentage for each category
  const pieData = [
    {
      name: 'Paid',
      y: (totalCounts.Paid / totalResponses) * 100 || 0,
      color: darkMode ? '#b1e4e3' : '#CA9A61', // Solid Paid color
    },
    {
      name: 'Organic',
      y: (totalCounts.Organic / totalResponses) * 100 || 0,
      color: darkMode ? '#ffb7ae' : '#196E64', // Solid Organic color
    },
  ];

  const colors = {
    textColor: darkMode ? '#9FA3A6' : '#000000',
    plotBackgroundColor: darkMode ? '#11161d' : '#f3f1ee',
    borderRadius: 12,
  };

  const options = {
    chart: {
      type: 'pie',
      backgroundColor: colors.plotBackgroundColor,
      borderRadius: colors.borderRadius,
      style: {
        fontFamily: 'PP Object Sans, sans-serif', // Apply fontFamily globally
      },
    },
    title: {
      text: 'Paid vs Organic',
      style: {
        color: colors.textColor,
      },
    },
    legend: {
      itemStyle: {
        color: colors.textColor,
      },
      align: 'center',
      verticalAlign: 'top',
      layout: 'horizontal',
      labelFormatter: function () {
        return `${this.name}: ${Math.round(this.y)}%`;
      },
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      style: {
        color: colors.textColor,
      },
    },
    plotOptions: {
      pie: {
        borderWidth: 0,
        allowPointSelect: true,
        cursor: 'pointer',
        showInLegend: true,
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: 'Mix',
        colorByPoint: true,
        data: pieData,
      },
    ],
    exporting: {
      buttons: {
        contextButton: {
          theme: {
            style: {
              opacity: 0.2, // hamburger icon opacity
            },
          },
        },
      },
    },
  };

  return (
    <div
      className={clsx(
        'rounded-[12px] w-[400px] max-md:w-[240px] max-sm:w-full',
        {
          'opacity-50 grayscale pointer-events-none': isLoading || !data,
        }
      )}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Paidvsorganic;
