import AcquisitionMetricsChart from '../components/snapshot/acquisitionmetrics/acquisitionmetrics';
import MyResponsiveLine from '../components/snapshot/acquisitionmetrics/nivoacquisitionmectrics';
import DailyRevenue from '../components/snapshot/dailyrevenue/dailyrevenue';
import Kpi from '../components/snapshot/kpi/kpi';
import Paidvsorganic from '../components/snapshot/paidvsorganic/paidvsorganic';
import SessionsVsCVRChart from '../components/snapshot/sessionscvr/sessionscvr';
import LineChart from '../components/snapshot/acquisitionmetrics/chartjsacquisitionmetrics';
import { Chart } from 'chart.js';
import { DatePickerWithRange } from '../components/snapshot/daterange/daterange';
import ProjectedRevenue from '../components/snapshot/projectedrevenue/projectedrevenue';

const Snapshot = () => {
  return (
    <div className='flex flex-col gap-[20px] pt-[20px] h-full w-full pr-4 max-xl:px-4'>
      <div className='flex justify-between w-full'>
        <ProjectedRevenue />
        <DatePickerWithRange />
      </div>
      <div className='flex w-full gap-[20px] h-min '>
        <Kpi />
        <DailyRevenue />
      </div>
      <div className='flex w-full gap-[20px]'>
        <Paidvsorganic />
        <SessionsVsCVRChart />
      </div>
      <div className='w-full h-min'>
        <AcquisitionMetricsChart />
      </div>
      {/* <div className='flex flex-col hidden'>
        <LineChart />
        <MyResponsiveLine />
      </div> */}
    </div>
  );
};

export default Snapshot;
