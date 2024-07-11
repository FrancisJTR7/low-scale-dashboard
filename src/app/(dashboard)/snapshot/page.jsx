import AcquisitionMetricsChart from './_components/acquisitionmetrics';
import DailyRevenue from './_components/dailyrevenue';
import Kpi from './_components/kpi';
import Paidvsorganic from './_components/paidvsorganic';
import SessionsVsCVRChart from './_components/sessionscvr';
import { DatePickerWithRange } from './_components/daterange';
import ProjectedRevenue from './_components/projectedrevenue';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/utils/supabase/client';

export default async function Snapshot() {
  const supabase = createClient();

  // Fetch the authenticated user and their information from Supabase
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  // log error if there is an error fetching the authenticated user
  if (authError) {
    console.error('Error fetching authenticated user:', authError);
    return;
  }
  // Redirect to login page if user is not authenticated
  if (!user) {
    return redirect('/login');
  }
  // Variable to store the authenticated user's email
  const userEmail = user.email;

  // Fetch users data by email
  const { data: userInfo, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('email', userEmail);

  // Variable to store the authenticated user's company id
  const userId = userInfo[0].company_id;

  // Fetch company data by company id tying to user
  const { data: companyInfo } = await supabase
    .from('companies')
    .select('*')
    .eq('id', userId);

  // Variable to store the authenticated user's portfolio id
  const userPortfolioId = userInfo[0].portfolio_id;
  // Fetch portfolio companies data by portfolio id tying to user
  const { data: portfolioList } = await supabase
    .from('portfolio_companies')
    .select('*, companies(company_name)')
    .eq('portfolio_id', userPortfolioId);
  // .leftJoin('companies', 'portfolio_companies.company_id', 'companies.id');

  // log error if there is an error fetching the user info
  if (userError) {
    console.error('Error fetching user info:', userError);
  } else {
    console.log('Fetched user info:', userInfo);
  }
  // log warning if there is no user info found for the authenticated user
  if (!userInfo.length) {
    console.warn('No user info found for the authenticated user.');
  }

  const tableIdentifier = 'paka';

  // const tableIdentifier = companyInfo[0].table_identifier;

  console.log('tableIdentifier:', tableIdentifier);

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
        <Paidvsorganic tableIdentifier={tableIdentifier} />
        <SessionsVsCVRChart />
      </div>
      <div className='w-full h-min'>
        <AcquisitionMetricsChart />
      </div>
      <Link href={'/snapshot/snaptest'}>Snaptest</Link>
      <div className='text-black'>
        <pre>{JSON.stringify(userInfo, null, 2)}</pre>
        <pre>{JSON.stringify(companyInfo, null, 2)}</pre>
        <pre>{JSON.stringify(portfolioList, null, 2)}</pre>
        {/* <pre>{JSON.stringify(portfolioCompanies, null, 2)}</pre> */}
      </div>
    </div>
  );
}
