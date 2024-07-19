'use client';

import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';
import useBigQueryData from '../../../hooks/useFetchData';
import { useQueryClient } from '@tanstack/react-query';

const Paidvsorganic = () => {
  const queryClient = useQueryClient();
  const [tableIdentifier, setTableIdentifier] = useState(null);

  useEffect(() => {
    const cachedData = queryClient.getQueryData('userData');
    if (cachedData) {
      setTableIdentifier(cachedData.tableIdentifier);
    }
  }, [queryClient]);

  const { data, error, isLoading } = useBigQueryData(tableIdentifier);

  if (!tableIdentifier) {
    return <div>Loading...</div>;
  }

  const options = {
    chart: {
      type: 'pie',
      backgroundColor: '#F3F1EE',
      borderRadius: '12px',
    },
    title: {
      text: 'Paid vs Organic',
      align: 'center',
    },
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'top',
      y: 20,
      floating: true,
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
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
        <h1>BigQuery Data</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Paidvsorganic;
