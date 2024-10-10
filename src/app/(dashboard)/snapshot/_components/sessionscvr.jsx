'use client';

import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import useBigQueryData from '../../../hooks/useFetchData';
import patternFill from 'highcharts/modules/pattern-fill';
import clsx from 'clsx';

patternFill(Highcharts);

const SessionsVsCVRChart = () => {
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

  useEffect(() => {
    if (typeof Highcharts === 'object') {
      HighchartsExporting(Highcharts);
    }
  }, []);

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

  // Adjusted Data Handling
  const filteredData =
    isLoading || error || !data || data.length === 0
      ? {
          date: [],
          sessions: [],
          cvr: [],
          cac: [],
        }
      : data.reduce(
          (acc, item) => {
            const currentDate = new Date(item.date.value);
            if (currentDate >= adjustedStartDate && currentDate <= end) {
              acc.date.push(currentDate.toISOString().split('T')[0]);
              acc.sessions.push(formatNumber(item.sessions));
              acc.cvr.push(formatNumber(item.cvr || item.new_orders || 0));
              acc.cac.push(formatNumber(item.cac));
            }
            return acc;
          },
          { date: [], sessions: [], cvr: [], cac: [] }
        );

  // Sort the data by date
  const sortedIndices = filteredData.date
    .map((date, index) => ({ date, index }))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((item) => item.index);

  for (const key in filteredData) {
    filteredData[key] = sortedIndices.map((i) => filteredData[key][i]);
  }

  const colors = {
    sessions0: darkMode ? '#196E64' : '#B1E4E3',
    sessions1: darkMode ? '#196E64' : '#B1E4E3',
    cvr0: darkMode ? '#f7efd6' : '#892951',
    cvr1: darkMode ? '#f7efd6' : '#892951',
    textColor: darkMode ? '#9FA3A6' : '#000000',
    plotBackgroundColor: darkMode ? '#11161d' : '#f3f1ee',
    tickLineColor: darkMode ? '#24282c' : '#cec8bb',
    sessionsOpacity: darkMode ? 0.8 : 1.0,
    cvrOpacity: darkMode ? 0.7 : 0.7,
    borderRadius: 12,
  };

  const options = {
    chart: {
      type: 'line',
      backgroundColor: colors.plotBackgroundColor,
      borderRadius: colors.borderRadius,
      style: {
        color: darkMode ? '#98A4AE' : '#11161d',
        fontFamily: 'PP Object Sans, sans-serif', // Apply fontFamily globally
      },
    },
    title: {
      text: 'Sessions vs CVR',
      style: {
        color: colors.textColor,
        fontFamily: 'PP Object Sans, sans-serif',
      },
    },
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'top',
      itemStyle: {
        color: colors.textColor,
        fontWeight: 'bold',
      },
    },
    xAxis: {
      categories: filteredData.date.map((dateStr) => {
        const dateObj = new Date(`${dateStr}T00:00:00`); // Add time to prevent timezone issues
        return `${dateObj.getMonth() + 1}/${dateObj.getDate()}`; // Format as 'M/D'
      }),
      labels: {
        style: {
          color: colors.textColor,
          fontFamily: 'PP Object Sans, sans-serif',
        },
      },
    },
    yAxis: [
      {
        title: {
          text: 'Sessions',
          style: {
            color: colors.textColor,
            fontFamily: 'PP Object Sans, sans-serif',
          },
        },
        labels: {
          style: {
            color: colors.textColor,
            fontFamily: 'PP Object Sans, sans-serif',
          },
        },
        min: 0,
        gridLineColor: colors.tickLineColor,
        tickColor: colors.tickLineColor,
      },
      {
        title: {
          text: 'CVR',
          style: {
            color: colors.textColor,
            fontFamily: 'PP Object Sans, sans-serif',
          },
        },
        labels: {
          style: {
            color: colors.textColor,
            fontFamily: 'PP Object Sans, sans-serif',
          },
          formatter: function () {
            return `${(this.value * 100).toFixed(2)}%`;
          },
        },
        min: 0,
        gridLineColor: colors.tickLineColor,
        tickColor: colors.tickLineColor,
        opposite: true,
      },
    ],
    tooltip: {
      shared: true,
      formatter: function () {
        let tooltip = `<strong style="color: ${colors.textColor}">${this.x}</strong><br>`;
        this.points.forEach((point) => {
          tooltip += `<span style="color: ${point.color}">${
            point.series.name
          }:</span> ${
            point.series.name === 'CVR'
              ? (point.y * 100).toFixed(2) + '%'
              : Highcharts.numberFormat(point.y, 0, '.', ',')
          }<br>`;
        });
        return tooltip;
      },
      style: {
        color: colors.textColor,
        fontFamily: 'PP Object Sans, sans-serif',
      },
    },
    series: [
      {
        name: 'Sessions',
        type: 'spline',
        data: filteredData.sessions,
        lineWidth: 2.5,
        opacity: colors.sessionsOpacity,
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, colors.sessions0],
            [1, colors.sessions1],
          ],
        },
      },
      {
        name: 'CVR',
        type: 'spline',
        data: filteredData.cvr,
        yAxis: 1,
        lineWidth: 2.5,
        opacity: colors.cvrOpacity,
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, colors.cvr0],
            [1, colors.cvr1],
          ],
        },
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
      className={clsx('w-full grid justify-items-stretch', {
        'opacity-50 grayscale pointer-events-none':
          isLoading || error || !data || data.length === 0,
      })}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default SessionsVsCVRChart;
