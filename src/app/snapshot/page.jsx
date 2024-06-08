import React from 'react';
import AcquisitionMetricsChart from '../ui/snapshot/acquisitionmetrics/acquisitionmetrics';
import MyResponsiveLine from '../ui/snapshot/acquisitionmetrics/nivoacquisitionmectrics';
import DailyRevenue from '../ui/snapshot/dailyrevenue/dailyrevenue';
import Kpi from '../ui/snapshot/kpi/kpi';
import Paidvsorganic from '../ui/snapshot/paidvsorganic/paidvsorganic';
import SessionsVsCVRChart from '../ui/snapshot/sessionscvr/sessionscvr';
import LineChart from '../ui/snapshot/acquisitionmetrics/chartjsacquisitionmetrics';
import { Chart } from 'chart.js';

const Snapshot = () => {
  return (
    <div className='flex flex-col gap-[20px] pt-[20px] w-full h-[100vh]'>
      <div className='flex w-[81%] gap-[20px]'>
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
