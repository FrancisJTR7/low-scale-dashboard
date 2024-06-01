import Card from '../ui/dashboard/card/card';
import Chart from '../ui/dashboard/chart/chart';
import Rightbar from '../ui/dashboard/rightbar/rightbar';
import Transactions from '../ui/dashboard/transactions/transactions';

const Dashboard = () => {
  return (
    <div className='flex gap-[20px] pt-[20px]'>
      <div className='flex-[3] flex flex-col gap-[20px]'>
        <div className='flex gap-[20px] justify-between'>
          <Card />
          <Card />
          <Card />
        </div>
        <Transactions />
        <Chart />
      </div>
      <div className='flex-1'>
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;
