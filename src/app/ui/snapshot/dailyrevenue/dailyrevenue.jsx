'use client';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const DailyRevenue = () => {
  const options = {
    chart: {
      type: 'area',
      backgroundColor: '#F3F1EE',
      height: '59.25%',
      borderRadius: 8,
    },
    title: {
      text: 'Daily Revenue',
    },
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'top',
      x: 0,
      y: 0,
    },
    xAxis: {
      categories: [
        '5/13',
        '5/14',
        '5/15',
        '5/16',
        '5/17',
        '5/18',
        '5/19',
        '5/20',
        '5/21',
        '5/22',
        '5/23',
        '5/24',
        '5/25',
        '5/26',
        '5/27',
        '5/28',
        '5/29',
        '5/30',
        '5/31',
      ],
    },
    yAxis: [
      {
        title: {
          text: 'Revenue',
        },
      },
      {
        opposite: true,
        title: {
          text: '% Pacing to Target',
        },
      },
    ],
    series: [
      {
        name: 'Actual Revenue (Running)',
        data: [
          90000, 80000, 70000, 60000, 50000, 40000, 30000, 20000, 10000, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0,
        ],
        color: '#2E86C1',
        type: 'spline',
      },
      {
        name: 'Target Revenue (Running)',
        data: [
          85000, 75000, 65000, 55000, 45000, 35000, 25000, 15000, 5000, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0,
        ],
        color: '#F39C12',
        type: 'spline',
      },
      {
        name: 'New Revenue (Running)',
        data: [
          10000, 9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000, 0, 0, 0,
          0, 0, 0, 0, 0, 0,
        ],
        color: '#8E44AD',
        type: 'spline',
      },
      {
        name: 'Spend (Running)',
        data: [
          60000, 55000, 50000, 45000, 40000, 35000, 30000, 25000, 20000, 15000,
          10000, 5000, 0, 0, 0, 0, 0, 0, 0,
        ],
        color: '#E74C3C',
        type: 'spline',
      },
      {
        name: 'Target Spend (Running)',
        data: [
          50000, 45000, 40000, 35000, 30000, 25000, 20000, 15000, 10000, 5000,
          0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        color: '#34495E',
        type: 'spline',
      },
      {
        name: 'Actual Revenue (Daily)',
        data: [
          80000, 70000, 60000, 50000, 40000, 30000, 20000, 10000, 5000, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0,
        ],
        color: '#1ABC9C',
        type: 'spline',
      },
      {
        name: 'Target Revenue (Daily)',
        data: [
          75000, 65000, 55000, 45000, 35000, 25000, 15000, 5000, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0,
        ],
        color: '#9B59B6',
        type: 'spline',
      },
      {
        name: 'Delta Running Total Revenue',
        data: [
          5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000,
          55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000,
        ],
        color: '#E74C3C',
        type: 'spline',
      },
    ],
  };

  return (
    <div className=' w-[79%] h-min overflow-hidden self-start'>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default DailyRevenue;
