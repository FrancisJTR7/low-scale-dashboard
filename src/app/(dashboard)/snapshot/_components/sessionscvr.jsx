'use client';

import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';

const SessionsVsCVRChart = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    if (typeof Highcharts === 'object') {
      HighchartsExporting(Highcharts);
    }
  }, []);

  const options = {
    chart: {
      type: 'line',
      backgroundColor: darkMode ? '#11161D' : '#F3F1EE',
      borderRadius: '12px',
    },
    title: {
      text: 'Sessions vs CVR',
      align: 'center',
      style: {
        color: darkMode ? '#9FA3A6' : '#000000', // Title text color
      },
    },
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'top',
      y: 20,
      floating: true,
      itemStyle: {
        color: darkMode ? '#9FA3A6' : '#000000', // Legend text color
      },
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
      labels: {
        style: {
          color: darkMode ? '#9FA3A6' : '#000000', // X-axis labels color
        },
      },
    },
    yAxis: [
      {
        title: {
          text: 'Sessions',
          style: {
            color: darkMode ? '#9FA3A6' : '#000000', // Y-axis title color
          },
        },
        labels: {
          format: '{value}k',
          style: {
            color: darkMode ? '#9FA3A6' : '#000000', // Y-axis labels color
          },
        },
      },
      {
        title: {
          text: 'CVR',
          style: {
            color: darkMode ? '#9FA3A6' : '#000000', // Opposite Y-axis title color
          },
        },
        labels: {
          format: '{value}%',
          style: {
            color: darkMode ? '#9FA3A6' : '#000000', // Opposite Y-axis labels color
          },
        },
        opposite: true,
      },
    ],
    tooltip: {
      shared: true,
      formatter: function () {
        let tooltip = `<strong style="color: ${
          darkMode ? '#9FA3A6' : '#000000'
        }">${this.x}</strong><br>`;
        this.points.forEach((point) => {
          tooltip += `<span style="color: ${point.color}">${
            point.series.name
          }:</span> ${point.y}${point.series.name === 'CVR' ? '%' : 'k'}<br>`;
        });
        return tooltip;
      },
      style: {
        color: darkMode ? '#9FA3A6' : '#000000', // Tooltip text color
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
    <div className='w-full grid justify-items-stretch'>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default SessionsVsCVRChart;
