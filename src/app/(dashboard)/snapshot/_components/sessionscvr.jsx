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
  const { data, isLoading } = useBigQueryData(
    selectedTableIdentifier,
    'sessionsVsCvr',
    startDate,
    endDate
  );

  useEffect(() => {
    if (typeof Highcharts === 'object') {
      HighchartsExporting(Highcharts);
    }
  }, []);

  const colors = {
    sessions0: darkMode ? '#196E64' : '#B1E4E3',
    sessions1: darkMode ? '#196E64' : '#B1E4E3',
    cvr0: darkMode ? '#FA8CC8' : '#892951',
    cvr1: darkMode ? '#FA8CC8' : '#892951',
    textColor: darkMode ? '#9FA3A6' : '#000000',
    plotBackgroundColor: darkMode ? '#11161d' : '#f3f1ee',
    tickLineColor: darkMode ? '#24282c' : '#cec8bb',
    sessionsOpacity: darkMode ? 0.8 : 1.0,
    cvrOpacity: darkMode ? 0.7 : 0.7,
    borderRadius: 12,
  };

  const dates = isLoading || !data ? [] : data.map((item) => item.date);
  const sessions =
    isLoading || !data
      ? []
      : data.map((item) => parseFloat(item.sessions) || 0);
  const cvr =
    isLoading || !data ? [] : data.map((item) => parseFloat(item.cvr) || 0);

  const options = {
    chart: {
      type: 'line',
      backgroundColor: colors.plotBackgroundColor,
      borderRadius: colors.borderRadius,
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
      categories: dates.map((dateStr) => {
        const dateObj = new Date(`${dateStr}T00:00:00`);
        return `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
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
        data: sessions,
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
        data: cvr,
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
  };

  return (
    <div
      className={clsx('w-full grid justify-items-stretch', {
        'opacity-50 grayscale pointer-events-none': isLoading || !data,
      })}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default SessionsVsCVRChart;
