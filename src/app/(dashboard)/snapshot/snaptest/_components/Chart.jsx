'use client';
import { useRef, useEffect } from 'react';
import {
  Chart,
  registerables,
  TimeScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { useSelector } from 'react-redux';
import useBigQueryData from '../../../../hooks/useFetchData';

// Register the components
Chart.register(
  TimeScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  ...registerables
);
const DailyRevenueChart = () => {
  const chartRef = useRef();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const selectedTableIdentifier = useSelector(
    (state) => state.company.selectedTableIdentifier
  );

  const { data, isLoading, error } = useBigQueryData(
    selectedTableIdentifier,
    'dailyRevenue'
  );

  useEffect(() => {
    if (isLoading || error || !data) return;

    const metrics = {
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
      totalRevColor: darkMode ? '#49C5B1' : '#49C5B1',
      spendActualColor: darkMode ? '#FA8CC8' : '#892951',
      deltaColor: darkMode ? '#FFBEF0' : '#FF5C39',
    };

    const ctx = chartRef.current.getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: metrics.date,
        datasets: [
          {
            label: 'Actual Revenue (Running)',
            type: 'line',
            data: metrics.running_total_actual_total_revenue,
            borderColor: colors.totalRevColor,
            borderWidth: 2,
            fill: false,
            yAxisID: 'y1',
          },
          {
            label: 'Delta Running Total Revenue',
            type: 'line',
            data: metrics.delta_running_total_revenue_todate,
            borderColor: colors.deltaColor,
            borderWidth: 2,
            fill: false,
            yAxisID: 'y2',
          },
          {
            label: 'Spend (Running)',
            data: metrics.running_total_actual_spend,
            backgroundColor: colors.spendActualColor,
            borderColor: colors.spendActualColor,
            borderWidth: 1,
            yAxisID: 'y',
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              tooltipFormat: 'MMM D',
            },
          },
          y: {
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'Revenue',
            },
            ticks: {
              callback: function (value) {
                return value >= 1000 ? `$${value / 1000}k` : `$${value}`;
              },
            },
          },
          y1: {
            type: 'linear',
            position: 'right',
            display: true,
            grid: {
              drawOnChartArea: false,
            },
          },
          y2: {
            type: 'linear',
            position: 'right',
            display: true,
            grid: {
              drawOnChartArea: false,
            },
            ticks: {
              callback: function (value) {
                return `${(value + 1) * 100}%`;
              },
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                if (tooltipItem.datasetIndex === 1) {
                  return `${tooltipItem.dataset.label}: ${
                    (tooltipItem.raw + 1) * 100
                  }%`;
                }
                return `${
                  tooltipItem.dataset.label
                }: $${tooltipItem.raw.toLocaleString()}`;
              },
            },
          },
        },
      },
    });
  }, [data, isLoading, error, darkMode]);

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error loading data</div>;

  return <canvas ref={chartRef} />;
};

export default DailyRevenueChart;
