'use client';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import useBigQueryData from '../../../hooks/useFetchData';

const AcquisitionMetricsChart = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const selectedTableIdentifier = useSelector(
    (state) => state.company.selectedTableIdentifier
  );
  const { startDate, endDate } = useSelector((state) => state.selectedDates);

  const { data, isLoading, error } = useBigQueryData(
    selectedTableIdentifier,
    'dailyBiz'
  );

// Helper function to safely format numbers with specified decimal places
const formatNumber = (value, decimalPlaces) => {
  const num = parseFloat(value);
  return isNaN(num) ? value : num.toFixed(decimalPlaces);
};

// Ensure data and data.date exist before processing
if (data && data.date) {
  // Filter and transform data
  const filteredData = data.date.value.reduce((acc, date, index) => {
    const currentDate = new Date(date);
    if (currentDate >= startDate && currentDate <= endDate) {
      acc.date.push(date);
      acc.cpo.push(formatNumber(data.cpo[index], 2));
      acc.cac.push(formatNumber(data.cac[index], 2));
      acc.roas.push(formatNumber(data.roas[index], 2));
      acc.new_orders.push(data.new_orders[index].toString());
      acc.total_spend.push(formatNumber(data.total_spend[index], 2));
      acc.broas.push(formatNumber(data.broas[index], 2));
      acc.sessions.push(formatNumber(data.sessions[index], 0));
      acc.cvr.push(formatNumber(data.cvr[index], 4));
      acc.newcvr.push(formatNumber(data.newcvr[index], 4));
    }
    return acc;
  }, {
    date: [],
    cpo: [],
    cac: [],
    roas: [],
    new_orders: [],
    total_spend: [],
    broas: [],
    sessions: [],
    cvr: [],
    newcvr: []
  });
  // Sort the data in descending order by date
  const sortedIndices = filteredData.date
    .map((date, index) => ({ date, index }))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(item => item.index);
  // Apply sorting to all arrays
  for (const key in filteredData) {
    filteredData[key] = sortedIndices.map(i => filteredData[key][i]);
  }
  return filteredData;
} else {
  console.error("Data or data.date is undefined.");
  return {
    date: [],
    cpo: [],
    cac: [],
    roas: [],
    new_orders: [],
    total_spend: [],
    broas: [],
    sessions: [],
    cvr: [],
    newcvr: []
  };
}

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
      categories: ['1/1'], //filteredData.Date,
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
        data: [20], //filteredData.total_spend,
        color: '#D4A15A',
        yAxis: 0,
      },
      {
        name: 'New Customers',
        type: 'line',
        data: [10], //filteredData.new_orders,
        color: '#AF7AC5',
        yAxis: 1,
      },
      {
        name: 'CAC',
        type: 'line',
        data: [15], //filteredData.cac,
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
