'use client';

import React from 'react';
import AcquisitionMetricsChart from '../components/snapshot/acquisitionmetrics/acquisitionmetrics';
import MyResponsiveLine from '../components/snapshot/acquisitionmetrics/nivoacquisitionmectrics';
import DailyRevenue from '../components/snapshot/dailyrevenue/dailyrevenue';
import Kpi from '../components/snapshot/kpi/kpi';
import Paidvsorganic from '../components/snapshot/paidvsorganic/paidvsorganic';
import SessionsVsCVRChart from '../components/snapshot/sessionscvr/sessionscvr';
import LineChart from '../components/snapshot/acquisitionmetrics/chartjsacquisitionmetrics';
import { Chart } from 'chart.js';
import { DatePickerWithRange } from '../components/snapshot/daterange/daterange';
// import { DatePickerWithRangeShad } from '../components/snapshot/daterange/daterangeshad';

const Snapshot = () => {
  return (
    <div className='flex flex-col gap-[20px] pt-[20px] w-full h-[100vh]'>
      <DatePickerWithRange />
      {/* <DatePickerWithRangeShad /> */}
      <div className='flex w-full gap-[20px]'>
        <Kpi />
        <DailyRevenue />
      </div>
      <div className='flex gap-[20px]'>
        <Paidvsorganic />
        <SessionsVsCVRChart />
      </div>
      <div className='flex flex-col'>
        <LineChart />
        <MyResponsiveLine />
      </div>
    </div>
  );
};

export default Snapshot;
