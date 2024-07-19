import React from 'react';
import { createClient } from '@/utils/supabase/server';
import Sidebar from './_components/sidebar/sidebar';
import Topbar from './_components/topbar/topbar';
import { redirect } from 'next/navigation';

const fetchUserData = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  const userEmail = user.email;

  const { data: userInfo, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('email', userEmail);

  if (userError) {
    throw new Error('User not found');
  }

  const userId = userInfo[0]?.company_id;

  const { data: companyInfo } = await supabase
    .from('companies')
    .select('*')
    .eq('id', userId);

  const userPortfolioId = userInfo[0]?.portfolio_id;

  const { data: portfolioList } = await supabase
    .from('portfolio_companies')
    .select('*, companies(company_name)')
    .eq('portfolio_id', userPortfolioId);

  const tableIdentifier = companyInfo[0]?.table_identifier;

  return {
    userInfo: userInfo[0] || {},
    companyInfo: companyInfo[0] || {},
    portfolioList: portfolioList || [],
    tableIdentifier: tableIdentifier || '',
  };
};

const Layout = async ({ children }) => {
  const data = await fetchUserData();

  return (
    <div className='flex font-pp-object-sans justify-center max-xl:flex-col'>
      <div className='max-xl:hidden'>
        <Sidebar />
      </div>
      <Topbar {...data} />
      <div className='w-[95%] max-xl:w-full overflow-x-hidden pl-2'>
        {children}
      </div>
    </div>
  );
};

export default Layout;
