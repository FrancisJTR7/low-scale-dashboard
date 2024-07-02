'use client';

// import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';
import useBigQueryData from '../../../hooks/useFetchData';

const Paidvsorganic = () => {
  const { data, error, isLoading } = useBigQueryData();

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch('/api/bigquerydata');
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const result = await response.json();
  //       console.log(result);
  //       setData(result);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   }
  //   fetchData();
  // }, []);

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
      {/* <div>
        <h1>BigQuery Data</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div> */}
    </div>
  );
};

export default Paidvsorganic;
