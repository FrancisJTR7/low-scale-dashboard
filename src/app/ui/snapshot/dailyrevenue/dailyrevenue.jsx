'use client';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const DailyRevenue = () => {
  const metrics = 
    {
        "date": [
          "2024-06-01",
          "2024-06-02",
          "2024-06-03",
          "2024-06-04",
          "2024-06-05",
          "2024-06-06",
          "2024-06-07",
          "2024-06-08",
          "2024-06-09",
          "2024-06-10",
          "2024-06-11",
          "2024-06-12",
          "2024-06-13",
          "2024-06-14",
          "2024-06-15",
          "2024-06-16",
          "2024-06-17",
          "2024-06-18",
          "2024-06-19",
          "2024-06-20",
          "2024-06-21",
          "2024-06-22",
          "2024-06-23",
          "2024-06-24",
          "2024-06-25",
          "2024-06-26",
          "2024-06-27",
          "2024-06-28",
          "2024-06-29",
          "2024-06-30"
        ],
        "actual_spend": [
          "12793.43",
          "13562.50",
          "12445.38",
          "11318.74",
          "12203.56",
          "12018.39",
          "11860.14",
          "12020.97",
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        ],
        "actual_new_revenue": [
          "29146.00",
          "38991.00",
          "27407.00",
          "29298.00",
          "28902.00",
          "24869.00",
          "25697.00",
          "31078.00",
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        ],
        "actual_total_revenue": [
          "44429.00",
          "57491.00",
          "45893.77",
          "48887.27",
          "47085.75",
          "38200.81",
          "42257.26",
          "43290.00",
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        ],
        "target_spend": [
          "11099.87",
          "11099.87",
          "11099.87",
          "11099.87",
          "11099.87",
          "11099.87",
          "11099.87",
          "11099.87",
          "11099.87",
          "11099.87",
          "11099.87",
          "11099.87",
          "11099.87",
          "11099.87",
          "11099.87",
          "11099.87",
          "11099.87",
          "11099.87",
          "11099.87",
          "11099.87",
          "11099.87",
          "11099.87",
          "11099.87",
          "11099.87",
          "11099.87",
          "11099.87",
          "11099.87",
          "11099.87",
          "11099.87",
          "11099.87"
        ],
        "target_new_revenue": [
          "36434.46",
          "36434.46",
          "36434.46",
          "36434.46",
          "36434.46",
          "36434.46",
          "36434.46",
          "36434.46",
          "36434.46",
          "36434.46",
          "36434.46",
          "36434.46",
          "36434.46",
          "36434.46",
          "36434.46",
          "36434.46",
          "36434.46",
          "36434.46",
          "36434.46",
          "36434.46",
          "36434.46",
          "36434.46",
          "36434.46",
          "36434.46",
          "36434.46",
          "36434.46",
          "36434.46",
          "36434.46",
          "36434.46",
          "36434.46"
        ],
        "target_total_revenue": [
          "54901.46",
          "54901.46",
          "54901.46",
          "54901.46",
          "54901.46",
          "54901.46",
          "54901.46",
          "54901.46",
          "54901.46",
          "54901.46",
          "54901.46",
          "54901.46",
          "54901.46",
          "54901.46",
          "54901.46",
          "54901.46",
          "54901.46",
          "54901.46",
          "54901.46",
          "54901.46",
          "54901.46",
          "54901.46",
          "54901.46",
          "54901.46",
          "54901.46",
          "54901.46",
          "54901.46",
          "54901.46",
          "54901.46",
          "54901.46"
        ],
        "running_total_actual_spend": [
          "12793.43",
          "26355.93",
          "38801.31",
          "50120.05",
          "62323.61",
          "74342.00",
          "86202.14",
          "98223.11",
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        ],
        "running_total_actual_new_revenue": [
          "29146.00",
          "68137.00",
          "95544.00",
          "124842.00",
          "153744.00",
          "178613.00",
          "204310.00",
          "235388.00",
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        ],
      }
  const options = {
    chart: {
      type: 'area',
      backgroundColor: '#F3F1EE',
      height: '59.25%',
      borderRadius: 8,
    },
    title: {
      text: 'Daily Revenue',
    },
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'top',
      x: 0,
      y: 0,
    },
    xAxis: {
      categories: metrics.date
    },
    
    yAxis: [
      {
        title: {
          text: 'Revenue',
        },
      },
      {
        opposite: true,
        title: {
          text: '% Pacing to Target',
        },
        min: 0,
      },
    ],
    series: [
      {
        name: 'Actual Revenue (Running)',
        visible: false,
        data: metrics.running_total_actual_new_revenue,
        color: '#2E86C1',
        type: 'spline',
      },
      {
        name: 'Target Revenue (Running)',
        visible: false,
        data: [
          85000, 75000, 65000, 55000, 45000, 35000, 25000, 15000, 5000, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0,
        ],
        color: '#F39C12',
        type: 'spline',
      },
      {
        name: 'New Revenue (Running)',
        visible: false,
        data: [
          10000, 9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000, 0, 0, 0,
          0, 0, 0, 0, 0, 0,
        ],
        color: '#8E44AD',
        type: 'spline',
      },
      {
        name: 'Spend (Running)',
        data: [
          60000, 55000, 50000, 45000, 40000, 35000, 30000, 25000, 20000, 15000,
          10000, 5000, 0, 0, 0, 0, 0, 0, 0,
        ],
        color: '#E74C3C',
        type: 'spline',
      },
      {
        name: 'Target Spend (Running)',
        data: [
          50000, 45000, 40000, 35000, 30000, 25000, 20000, 15000, 10000, 5000,
          0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        color: '#34495E',
        type: 'spline',
      },
      {
        name: 'Actual Revenue (Daily)',
        data: metrics.actual_total_revenue,
        color: '#1ABC9C',
        type: 'spline',
      },
      {
        name: 'Target Revenue (Daily)',
        data: metrics.target_total_revenue,
        color: '#9B59B6',
        type: 'spline',
      },
      {
        name: 'Delta Running Total Revenue',
        data: [
          0.98, 1.01, 1.02, 1.00, .99, 1.00, 1.02, 1.03, 1.04, 1.02,
          1.02, 1.02, 1.01, 1.00, .99, .98, .99, 1.0, 1.1,
        ],
        yAxis: 1,
        color: '#E74C3C',
        type: 'spline',
      },
    ],
  };

  return (
    <div className=' w-[79%] h-min overflow-hidden self-start'>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default DailyRevenue;
