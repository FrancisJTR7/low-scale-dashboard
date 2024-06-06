import AcquisitionMetricsChart from '../ui/snapshot/acquisitionmetrics/acquisitionmetrics';
import DailyRevenue from '../ui/snapshot/dailyrevenue/dailyrevenue';
import Kpi from '../ui/snapshot/kpi/kpi';
import Paidvsorganic from '../ui/snapshot/paidvsorganic/paidvsorganic';
import SessionsVsCVRChart from '../ui/snapshot/sessionscvr/sessionscvr';

const Snapshot = () => {
  return (
    <div className='flex flex-col gap-[20px] pt-[20px] w-full h-[100vh]'>
      <div className='flex w-full  gap-[20px]'>
        <Kpi />
        <DailyRevenue />
      </div>
      <div className='flex gap-[20px]'>
        <Paidvsorganic />
        <SessionsVsCVRChart />
      </div>
      <AcquisitionMetricsChart />
    </div>
  );
};

export default Snapshot;
