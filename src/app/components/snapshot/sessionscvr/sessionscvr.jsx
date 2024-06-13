'use client';

import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';

const SessionsVsCVRChart = () => {
  useEffect(() => {
    if (typeof Highcharts === 'object') {
      HighchartsExporting(Highcharts);
    }
  }, []);

  const options = {
    chart: {
      type: 'line',
      backgroundColor: '#F3F1EE',
      borderRadius: '12px',
    },
    title: {
      text: 'Sessions vs CVR',
      align: 'center',
    },
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'top',
      y: 20,
      floating: true,
    },
    xAxis: {
      categories: [
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
        '6/1',
        '6/2',
        '6/3',
        '6/4',
        '6/5',
      ],
    },
    yAxis: [
      {
        title: {
          text: 'Sessions',
        },
        labels: {
          format: '{value}k',
        },
      },
      {
        title: {
          text: 'CVR',
        },
        labels: {
          format: '{value}%',
        },
        opposite: true,
      },
    ],
    tooltip: {
      shared: true,
      formatter: function () {
        let tooltip = `<strong>${this.x}</strong><br>`;
        this.points.forEach((point) => {
          tooltip += `${point.series.name}: ${point.y}${
            point.series.name === 'CVR' ? '%' : 'k'
          }<br>`;
        });
        return tooltip;
      },
    },
    series: [
      {
        name: 'Sessions',
        data: [12, 13, 11, 14, 16, 12, 13, 14, 13, 12, 12, 15, 16, 14, 13],
        color: '#5DADE2',
      },
      {
        name: 'CVR',
        data: [
          2.1, 2.3, 2.2, 2.4, 2.5, 2.3, 2.1, 2.4, 2.2, 2.1, 2.3, 2.4, 2.5, 2.2,
          2.3,
        ],
        color: '#AF7AC5',
        yAxis: 1,
      },
    ],
  };

  return (
    <div className='w-full '>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default SessionsVsCVRChart;
