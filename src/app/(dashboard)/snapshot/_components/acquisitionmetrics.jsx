'use client';

import { useSelector } from 'react-redux';
import Highcharts, { color } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import useBigQueryData from '../../../hooks/useFetchData';
import clsx from 'clsx';

const AcquisitionMetricsChart = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const selectedTableIdentifier = useSelector(
    (state) => state.company.selectedTableIdentifier
  );
  const { startDate, endDate } = useSelector((state) => state.selectedDates);

  const { data, isLoading, error } = useBigQueryData(
    selectedTableIdentifier,
    'dailyBiz',
    {
      staleTime: 1000 * 60 * 60, // 1 hour stale time, meaning it wont refetch for another hr
      cacheTime: 1000 * 60 * 60 * 6, // 6 hour cache time, meaning the data is stored for 6 hours
    }
  );

  const formatNumber = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  };

  // Calculate the difference between the start and end dates
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dateDiff = (end - start) / (1000 * 60 * 60 * 24); // Difference in days

  // If the range is less than 15 days, adjust the start date to 14 days before the end date
  const adjustedStartDate =
    dateDiff < 15 ? new Date(end.getTime() - 14 * 24 * 60 * 60 * 1000) : start;

  // Define the data for the chart
  const filteredData =
    isLoading || error || !data || data.length === 0
      ? {
          date: [],
          total_spend: [],
          new_customers: [],
          cac: [],
        }
      : data.reduce(
          (acc, item) => {
            const currentDate = new Date(item.date.value);
            if (currentDate >= adjustedStartDate && currentDate <= end) {
              acc.date.push(currentDate.toISOString().split('T')[0]);

              acc.total_spend.push(formatNumber(item.total_spend));
              acc.new_customers.push(
                formatNumber(item.new_customers || item.new_orders || 0)
              );
              acc.cac.push(formatNumber(item.cac));
            }
            return acc;
          },
          { date: [], total_spend: [], new_customers: [], cac: [] }
        );

  // Sort the data by date
  const sortedIndices = filteredData.date
    .map((date, index) => ({ date, index }))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((item) => item.index);

  for (const key in filteredData) {
    filteredData[key] = sortedIndices.map((i) => filteredData[key][i]);
  }

  // Highcharts configuration
  const options = {
    chart: {
      backgroundColor: darkMode ? '#11161D' : '#F3F1EE',
      borderRadius: '12px',
      height: 450,
      style: {
        fontFamily: 'PP Object Sans, sans-serif', // Apply fontFamily globally
      },
    },
    title: {
      text: 'Acquisition Metrics',
      align: 'center',
      style: {
        color: darkMode ? '#9FA3A6' : '#000000',
      },
    },
    xAxis: {
      categories: filteredData.date.map((dateStr) => {
        const dateObj = new Date(`${dateStr}T00:00:00`); // Add time to prevent timezone issues
        return `${dateObj.getMonth() + 1}/${dateObj.getDate()}`; // Format as 'M/D'
      }),
      labels: {
        style: {
          color: darkMode ? '#9FA3A6' : '#000000',
        },
      },
    },
    yAxis: [
      {
        title: {
          text: 'Spend',
          style: {
            color: darkMode ? '#9FA3A6' : '#000000',
          },
        },
        labels: {
          formatter: function () {
            return '$' + Highcharts.numberFormat(this.value / 1000, 0) + 'k';
          },
          style: {
            color: darkMode ? '#9FA3A6' : '#000000',
          },
        },
      },
      {
        title: {
          text: 'New Customers',
          style: {
            color: darkMode ? '#9FA3A6' : '#000000',
          },
        },
        labels: {
          format: '{value}',
          style: {
            color: darkMode ? '#9FA3A6' : '#000000',
          },
        },
        opposite: true,
      },
      {
        title: {
          text: 'CAC',
          style: {
            color: darkMode ? '#9FA3A6' : '#000000',
          },
        },
        labels: {
          format: '${value}',
          style: {
            color: darkMode ? '#9FA3A6' : '#000000',
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
          let value = point.y;
          if (point.series.name === 'Spend') {
            value = '$' + Highcharts.numberFormat(value, 2) + 'k';
          } else if (point.series.name === 'CAC') {
            value = '$' + Highcharts.numberFormat(value, 2);
          }
          tooltip += `<span style="color: ${point.color}">${point.series.name}:</span> ${value}<br>`;
        });
        return tooltip;
      },
      style: {
        color: darkMode ? '#9FA3A6' : '#000000',
      },
    },
    legend: {
      itemStyle: {
        color: darkMode ? '#98A4AE' : '#11161d', // Set legend text color
      },
    },
    series: [
      {
        name: 'Spend',
        type: 'column',
        data: filteredData.total_spend,
        color: '#D4A15A',
      },
      {
        name: 'New Customers',
        type: 'spline',
        data: filteredData.new_customers,
        color: '#AF7AC5',
        yAxis: 1,
      },
      {
        name: 'CAC',
        type: 'spline',
        data: filteredData.cac,
        color: '#E74C3C',
        yAxis: 2,
      },
    ],
    exporting: {
      buttons: {
        contextButton: {
          theme: {
            style: {
              opacity: 0.2, // hamburger icon opacity
            },
          },
        },
      },
    },
  };

  return (
    <div
      className={clsx('h-min w-full pb-4', {
        'opacity-50 grayscale pointer-events-none':
          isLoading || error || !data || data.length === 0,
      })}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default AcquisitionMetricsChart;
