import Link from 'next/link';
import DailyRevenueD3 from './_components/D3';
import DailyRevenueChart from './_components/Chart';

const page = () => {
  return (
    <div>
      <Link href={'/snapshot'}>Snapshot</Link>
      <DailyRevenueD3 />
      <DailyRevenueChart />
    </div>
  );
};

export default page;
