'use client';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Paidvsorganic = () => {
  const options = {
    chart: {
      type: 'pie',
      backgroundColor: '#F3F1EE',
      height: '100%',
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
    <div className='rounded-lg w-[32rem]  bg-[#F3F1EE] px-[6rem] h-[full]'>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Paidvsorganic;
