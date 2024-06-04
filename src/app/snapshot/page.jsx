import DailyRevenue from '../ui/snapshot/dailyrevenue/dailyrevenue';
import Kpi from '../ui/snapshot/kpi/kpi';
import Paidvsorganic from '../ui/snapshot/paidvsorganic/paidvsorganic';

const Snapshot = () => {
  return (
    <div className='flex flex-col gap-[20px] pt-[20px] w-full h-[100vh]'>
      <div className='flex w-full gap-[20px]'>
        <Kpi />
        <DailyRevenue />
      </div>
      <div>
        <Paidvsorganic />
      </div>
    </div>
  );
};

export default Snapshot;
