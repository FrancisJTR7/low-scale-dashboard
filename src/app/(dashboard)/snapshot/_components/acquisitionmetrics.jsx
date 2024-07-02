'use client';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const AcquisitionMetricsChart = () => {
  const options = {
    chart: {
      backgroundColor: '#F3F1EE',
      borderRadius: '12px',
      height: 450,
    },
    title: {
      text: 'Acquisition Metrics',
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
          text: 'Spend',
        },
        labels: {
          format: '${value}k',
        },
      },
      {
        title: {
          text: 'New Customers',
        },
        labels: {
          format: '{value}',
        },
        opposite: true,
      },
      {
        title: {
          text: 'CAC',
        },
        labels: {
          format: '${value}',
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
            point.series.name === 'CAC'
              ? '$'
              : point.series.name === 'Spend'
              ? 'k'
              : ''
          }<br>`;
        });
        return tooltip;
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
