'use client';

import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';

const Paidvsorganic = () => {
  useEffect(() => {
    if (typeof Highcharts === 'object') {
      HighchartsExporting(Highcharts);
    }
  }, []);

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
    <div className='rounded-[12px] w-[40%] '>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Paidvsorganic;
