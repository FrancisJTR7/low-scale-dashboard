'use client';

import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import useBigQueryData from '../../../hooks/useFetchData';
import { useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

const Paidvsorganic = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  // const queryClient = useQueryClient();
  // const [tableIdentifier, setTableIdentifier] = useState(null);
  // const [userInfo, setUserInfo] = useState(null);
  // const [companyInfo, setCompanyInfo] = useState(null);
  const selectedTableIdentifier = useSelector(
    (state) => state.company.selectedTableIdentifier
  );

  const { startDate, endDate } = useSelector((state) => state.selectedDates);
  // useEffect(() => {
  //   const cachedData = queryClient.getQueryData('userData');
  //   if (cachedData) {
  //     setTableIdentifier(cachedData.tableIdentifier);
  //     setUserInfo(cachedData.userInfo);
  //     setCompanyInfo(cachedData.companyInfo);
  //   }
  // }, [queryClient]);

  const { data } = useBigQueryData(selectedTableIdentifier);

  if (!selectedTableIdentifier) {
    return <div>Loading...</div>;
  }

  const options = {
    chart: {
      type: 'pie',
      backgroundColor: darkMode ? '#11161D' : '#F3F1EE',
      borderRadius: '12px',
    },
    title: {
      text: 'Paid vs Organic',
      align: 'center',
      style: {
        color: darkMode ? '#9FA3A6' : '#000000',
      },
    },
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'top',
      y: 20,
      floating: true,
      itemStyle: {
        color: darkMode ? '#9FA3A6' : '#000000',
      },
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      style: {
        color: darkMode ? '#9FA3A6' : '#000000',
      },
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
        size: '80%',
      },
    },
    series: [
      {
        name: 'Share',
        colorByPoint: true,
        data: [
          {
            name: 'Paid',
            y: 81,
            color: '#D4A15A',
          },
          {
            name: 'Organic',
            y: 19,
            color: '#437276',
          },
        ],
      },
    ],
  };

  return (
    <div className='rounded-[12px] w-[400px] max-md:w-[240px] max-sm:w-full'>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <div>
        <div>
          <h1>Selected Date Range:</h1>
          <p> Start Date: {startDate}</p>
          <p>End Date: {endDate}</p>
        </div>
        {/* <h1>Selected Company ID: {selectedTableIdentifier}</h1>
        <h1>BigQuery Data</h1>
        <h1>User Information</h1>
        <p>Username: {userInfo.email}</p>
        <p>Company: {companyInfo.id}</p>
        <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </div>
    </div>
  );
};

export default Paidvsorganic;
