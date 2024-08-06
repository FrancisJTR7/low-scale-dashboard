'use client';

import AcquisitionMetricsChart from './_components/acquisitionmetrics';
import DailyRevenue from './_components/dailyrevenue';
import Kpi from './_components/kpi';
import Paidvsorganic from './_components/paidvsorganic';
import SessionsVsCVRChart from './_components/sessionscvr';
import { DatePickerWithRange } from './_components/daterange';
import ProjectedRevenue from './_components/projectedrevenue';
import Link from 'next/link';

export default function Snapshot() {
  return (
    <div className='flex flex-col gap-[20px] pt-[30px] h-full w-full pr-4 max-xl:px-4'>
      <div className='flex mb-[-10px] justify-between items-center w-full max-sm:flex-col max-sm:gap-y-3 max-sm:mb-[2px]'>
        <ProjectedRevenue />
        <DatePickerWithRange />
      </div>
      <div className='flex w-full gap-[20px] h-min max-md:flex-col '>
        <Kpi />
        <DailyRevenue />
      </div>
      <div className='flex w-full gap-[20px] max-sm:flex-col'>
        <Paidvsorganic />
        <SessionsVsCVRChart />
      </div>
      <div className='w-full h-min'>
        <AcquisitionMetricsChart />
      </div>
      <Link href={'/snapshot/snaptest'}>Snaptest</Link>
      <button>Click me</button>
      <div className='text-black'>
        {/* <pre>{JSON.stringify(userInfo, null, 2)}</pre>
        <pre>{JSON.stringify(companyInfo, null, 2)}</pre>
        <pre>{JSON.stringify(portfolioList, null, 2)}</pre> */}
        {/* <pre>{JSON.stringify(portfolioCompanies, null, 2)}</pre> */}
      </div>
    </div>
  );
}
