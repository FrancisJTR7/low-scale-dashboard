'use client';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import useBigQueryData from '../../../hooks/useFetchData';
import { useSelector } from 'react-redux';
import patternFill from 'highcharts/modules/pattern-fill';
import clsx from 'clsx';

patternFill(Highcharts);

const DailyRevenue = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const selectedTableIdentifier = useSelector(
    (state) => state.company.selectedTableIdentifier
  );
  const { startDate, endDate } = useSelector((state) => state.selectedDates);

  const { data, isLoading, error } = useBigQueryData(
    selectedTableIdentifier,
    'dailyRevenue',
    startDate,
    endDate
  );

  // if (error || !data) {
  //   return <div>Error loading data</div>;
  // }

  const metrics =
    isLoading || !data
      ? {
          date: [], // No dates
          actual_spend: [],
          actual_new_revenue: [],
          actual_total_revenue: [],
          target_spend: [],
          target_new_revenue: [],
          target_total_revenue: [],
          running_total_actual_spend: [],
          running_total_actual_new_revenue: [],
          running_total_actual_total_revenue: [],
          running_total_target_total_revenue: [],
          running_total_target_new_revenue: [],
          delta_running_total_revenue_todate: [],
        }
      : {
          date: data.map((item) => item.date.value),
          actual_spend: data.map((item) => parseFloat(item.actual_spend) || 0),
          actual_new_revenue: data.map(
            (item) => parseFloat(item.actual_new_revenue) || 0
          ),
          actual_total_revenue: data.map(
            (item) => parseFloat(item.actual_total_revenue) || 0
          ),
          target_spend: data.map((item) => parseFloat(item.target_spend) || 0),
          target_new_revenue: data.map(
            (item) => parseFloat(item.target_new_revenue) || 0
          ),
          target_total_revenue: data.map(
            (item) => parseFloat(item.target_total_revenue) || 0
          ),
          running_total_actual_spend: data.map(
            (item) => parseFloat(item.running_total_actual_spend) || 0
          ),
          running_total_actual_new_revenue: data.map(
            (item) => parseFloat(item.running_total_actual_new_revenue) || 0
          ),
          running_total_actual_total_revenue: data.map(
            (item) => parseFloat(item.running_total_actual_total_revenue) || 0
          ),
          running_total_target_total_revenue: data.map(
            (item) => parseFloat(item.running_total_target_total_revenue) || 0
          ),
          running_total_target_new_revenue: data.map(
            (item) => parseFloat(item.running_total_target_new_revenue) || 0
          ),
          delta_running_total_revenue_todate: data.map(
            (item) => parseFloat(item.delta_running_total_revenue_todate) || 0
          ),
        };

  const colors = {
    plotBackgroundColor: darkMode ? '#11161d' : '#f3f1ee',
    textColor: darkMode ? '#98A4AE' : '#11161d',
    tickLineColor: darkMode ? '#24282c' : '#cec8bb',
    spendActual0: darkMode ? '#FA8CC8' : '#892951',
    spendActual1: darkMode ? '#FA8CC8' : '#892951',
    spendTarget0: darkMode ? '#FA8CC8' : '#892951',
    spendTarget1: darkMode ? '#FA8CC8' : '#892951',
    spendActualOpacity: darkMode ? 0.55 : 0.55,
    spendTargetOpacity: darkMode ? 0.55 : 0.55,
    totalRevColor0: darkMode ? '#49C5B1' : '#49C5B1',
    totalRevColor1: darkMode ? '#49C5B1' : '#49C5B1',
    totalRevOpacity: darkMode ? 0.8 : 1.0,
    totalRevTargetColor0: darkMode ? '#196E64' : '#49C5B1',
    totalRevTargetColor1: darkMode ? '#196E64' : '#49C5B1',
    totalRevTargetOpacity: darkMode ? 0.5 : 0.6,
    totalRevTargetDashStyle: darkMode ? 'ShortDash' : 'ShortDash',
    totalRevDeltaColor0: darkMode ? '#FFBEF0' : '#FF5C39',
    totalRevDeltaColor1: darkMode ? '#FFBEF0' : '#FF5C39',
    totalRevDeltaOpacity: darkMode ? 0.7 : 0.6,
    totalRevDeltaDashStyle: darkMode ? 'ShortDot' : 'ShortDot',
    newRevColor0: darkMode ? '#CA9A61' : '#CA9A61',
    newRevColor1: darkMode ? '#CA9A61' : '#CA9A61',
    newRevOpacity: darkMode ? 0.8 : 0.8,
    newRevTargetColor0: darkMode ? '#CA9A61' : '#CA9A61',
    newRevTargetColor1: darkMode ? '#CA9A61' : '#CA9A61',
    newRevTargetOpacity: darkMode ? 0.5 : 0.5,
    newRevTargetDashStyle: darkMode ? 'ShortDash' : 'ShortDash',
    currencySymbol: '$',
    borderRadius: 12,
  };

  const options = {
    chart: {
      type: 'area',
      backgroundColor: colors.plotBackgroundColor,
      borderRadius: colors.borderRadius,
    },
    title: {
      text: 'Daily Revenue',
      style: {
        color: colors.textColor,
        fontFamily: 'PP Object Sans, sans-serif',
      },
    },
    legend: {
      itemStyle: {
        color: colors.textColor,
        fontWeight: 'bold',
        fontSize: '11px',
      },
      align: 'center',
      verticalAlign: 'top',
    },
    xAxis: {
      categories: metrics.date.map((dateStr) => {
        const dateObj = new Date(`${dateStr}T00:00:00`); // Assume the date is in local time and add time to prevent timezone issues
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
          text: 'Revenue',
          style: {
            color: colors.textColor,
            fontFamily: 'PP Object Sans, sans-serif',
          },
        },
        labels: {
          formatter: function () {
            if (this.value >= 1000000) {
              return (
                colors.currencySymbol +
                Highcharts.numberFormat(this.value / 1000000, 0) +
                'M'
              );
            }
            if (this.value >= 1000) {
              return (
                colors.currencySymbol +
                Highcharts.numberFormat(this.value / 1000, 0) +
                'k'
              );
            }
            return colors.currencySymbol + this.value;
          },
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
          text: '',
          style: {
            color: colors.textColor,
            fontFamily: 'PP Object Sans, sans-serif',
          },
        },
        labels: {
          formatter: function () {
            if (this.value >= 1000) {
              return (
                colors.currencySymbol +
                Highcharts.numberFormat(this.value / 1000, 0) +
                'k'
              );
            }
            return colors.currencySymbol + this.value;
          },
          style: {
            color: colors.textColor,
            fontFamily: 'PP Object Sans, sans-serif',
          },
        },
        min: 0,
        gridLineColor: colors.tickLineColor,
        tickColor: colors.tickLineColor,
        opposite: true,
        visible: true,
      },
      {
        title: {
          text: '% Pacing to Target',
          style: {
            color: colors.textColor,
            fontFamily: 'PP Object Sans, sans-serif',
          },
        },
        labels: {
          formatter: function () {
            return Highcharts.numberFormat((this.value + 1) * 100, 0) + '%';
          },
          style: {
            color: colors.textColor,
            fontFamily: 'PP Object Sans, sans-serif',
          },
        },
        min: -1,
        max: 0.25,
        gridLineColor: colors.tickLineColor,
        tickColor: colors.tickLineColor,
        opposite: true,
        visible: true,
      },
    ],
    tooltip: {
      pointFormatter: function () {
        if (this.series.name === 'Delta Running Total Revenue') {
          return (
            '<span style="color:' +
            this.series.color +
            '">' +
            this.series.name +
            '</span>: <b>' +
            ((this.y + 1) * 100).toFixed(0) +
            '%' +
            '</b><br/>'
          );
        } else {
          return (
            '<span style="color:' +
            this.series.color +
            '">' +
            this.series.name +
            '</span>: <b>' +
            colors.currencySymbol +
            Highcharts.numberFormat(Math.round(this.y), 0, '.', ',') +
            '</b><br/>'
          );
        }
      },
      style: {
        color: colors.textColor,
        fontFamily: 'PP Object Sans, sans-serif',
      },
    },
    series: [
      {
        name: 'Actual Revenue (Running)',
        type: 'area',
        data: metrics.running_total_actual_total_revenue,
        visible: false,
        lineWidth: 2.5,
        opacity: colors.totalRevOpacity,
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, colors.totalRevColor0],
            [1, colors.totalRevColor1],
          ],
        },
      },
      {
        name: 'Target Revenue (Running)',
        type: 'spline',
        data: metrics.running_total_target_total_revenue,
        visible: false,
        lineWidth: 2.5,
        opacity: colors.totalRevTargetOpacity,
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, colors.totalRevTargetColor0],
            [1, colors.totalRevTargetColor1],
          ],
        },
      },
      {
        name: 'New Revenue (Running)',
        type: 'area',
        visible: false,
        data: metrics.running_total_actual_new_revenue,
        lineWidth: 2.5,
        opacity: colors.newRevOpacity,
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, colors.newRevColor0],
            [1, colors.newRevColor1],
          ],
        },
      },
      {
        name: 'Target New Revenue (Running)',
        type: 'spline',
        visible: false,
        data: metrics.running_total_target_new_revenue,
        lineWidth: 2.5,
        opacity: colors.newRevTargetOpacity,
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, colors.newRevTargetColor0],
            [1, colors.newRevTargetColor1],
          ],
        },
      },
      {
        name: 'Spend (Running)',
        type: 'column',
        visible: false,
        data: metrics.running_total_actual_spend,
        yAxis: 1,
        lineWidth: 2.5,
        opacity: colors.spendActualOpacity,
        borderWidth: 0,
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, colors.spendActual0],
            [1, colors.spendActual1],
          ],
        },
      },
      {
        name: 'Target Spend (Running)',
        type: 'column',
        visible: false,
        data: metrics.target_spend,
        yAxis: 1,
        lineWidth: 2.5,
        opacity: colors.spendTargetOpacity,
        borderWidth: 0,
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, colors.spendTarget0],
            [1, colors.spendTarget1],
          ],
        },
      },
      {
        name: 'Actual Revenue (Daily)',
        type: 'spline',
        data: metrics.actual_total_revenue,
        visible: true,
        lineWidth: 2.5,
        opacity: colors.totalRevOpacity,
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, colors.totalRevColor0],
            [1, colors.totalRevColor1],
          ],
        },
      },
      {
        name: 'Target Revenue (Daily)',
        dashStyle: colors.totalRevTargetDashStyle,
        type: 'spline',
        data: metrics.target_total_revenue,
        visible: true,
        lineWidth: 2.5,
        opacity: colors.totalRevTargetOpacity,
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, colors.totalRevTargetColor0],
            [1, colors.totalRevTargetColor1],
          ],
        },
      },
      {
        name: 'New Revenue (Daily)',
        type: 'spline',
        visible: false,
        data: metrics.actual_new_revenue,
        lineWidth: 2.5,
        opacity: colors.newRevOpacity,
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, colors.newRevColor0],
            [1, colors.newRevColor1],
          ],
        },
      },
      {
        name: 'Target New Revenue (Daily)',
        dashStyle: colors.newRevTargetDashStyle,
        type: 'spline',
        visible: false,
        data: metrics.target_new_revenue,
        lineWidth: 2.5,
        opacity: colors.newRevTargetOpacity,
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, colors.newRevTargetColor0],
            [1, colors.newRevTargetColor1],
          ],
        },
      },
      {
        name: 'Delta Running Total Revenue',
        dashStyle: colors.totalRevDeltaDashStyle,
        type: 'spline',
        visible: true,
        data: metrics.delta_running_total_revenue_todate,
        yAxis: 2,
        lineWidth: 2.5,
        opacity: colors.totalRevDeltaOpacity,
        borderWidth: 0,
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, colors.totalRevDeltaColor0],
            [1, colors.totalRevDeltaColor1],
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

export default DailyRevenue;
