'use client';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';

const AcquisitionMetricsChart = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const options = {
    chart: {
      backgroundColor: darkMode ? '#11161D' : '#F3F1EE',
      borderRadius: '12px',
      height: 450,
    },
    title: {
      text: 'Acquisition Metrics',
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
          text: 'Spend',
          style: {
            color: darkMode ? '#9FA3A6' : '#000000', // Y-axis title color
          },
        },
        labels: {
          format: '${value}k',
          style: {
            color: darkMode ? '#9FA3A6' : '#000000', // Y-axis labels color
          },
        },
      },
      {
        title: {
          text: 'New Customers',
          style: {
            color: darkMode ? '#9FA3A6' : '#000000', // Opposite Y-axis title color
          },
        },
        labels: {
          format: '{value}',
          style: {
            color: darkMode ? '#9FA3A6' : '#000000', // Opposite Y-axis labels color
          },
        },
        opposite: true,
      },
      {
        title: {
          text: 'CAC',
          style: {
            color: darkMode ? '#9FA3A6' : '#000000', // Second Opposite Y-axis title color
          },
        },
        labels: {
          format: '${value}',
          style: {
            color: darkMode ? '#9FA3A6' : '#000000', // Second Opposite Y-axis labels color
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
          }:</span> ${point.y}${
            point.series.name === 'CAC'
              ? '$'
              : point.series.name === 'Spend'
              ? 'k'
              : ''
          }<br>`;
        });
        return tooltip;
      },
      style: {
        color: darkMode ? '#9FA3A6' : '#000000', // Tooltip text color
      },
    },
    series: [
      {
        name: 'Spend',
        type: 'column',
        data: [20, 22, 24, 26, 28, 30, 22, 24, 26, 28, 30, 22, 24, 26, 28],
        color: '#D4A15A',
        yAxis: 0,
      },
      {
        name: 'New Customers',
        type: 'line',
        data: [
          150, 160, 170, 180, 190, 200, 160, 170, 180, 190, 200, 160, 170, 180,
          190,
        ],
        color: '#AF7AC5',
        yAxis: 1,
      },
      {
        name: 'CAC',
        type: 'line',
        data: [40, 42, 44, 46, 48, 50, 42, 44, 46, 48, 50, 42, 44, 46, 48],
        color: '#E74C3C',
        yAxis: 2,
      },
    ],
  };

  return (
    <div className='h-min w-full pb-4'>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default AcquisitionMetricsChart;
