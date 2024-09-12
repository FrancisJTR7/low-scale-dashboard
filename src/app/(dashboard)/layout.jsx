import React from 'react';
import { createClient } from '@/utils/supabase/server';
import Sidebar from './_navbars/sidebar/sidebar';
import Topbar from './_navbars/topbar/topbar';
import { redirect } from 'next/navigation';

const fetchUserData = async () => {
  const supabase = createClient();

  // User login
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  // Variable to store user email
  const userEmail = user.email;

  // Fetch data from users table based on email
  const { data: userInfo } = await supabase
    .from('users')
    .select('*')
    .eq('email', userEmail);

  // Variable to store authenticated user's company id
  const userId = userInfo[0]?.company_id;

  // Fetch company data by company id tying to user
  const { data: companyInfo } = await supabase
    .from('companies')
    .select('*')
    .eq('id', userId);

  // Variable to store user's table identifier
  const tableIdentifier = companyInfo[0]?.table_identifier;

  //Variable to store the hdyhau (how did you hear about us) variable
  const hdyhau = companyInfo[0]?.hdyhau.toLowerCase();

  // Variable to store the authenticated user's portfolio id
  const userPortfolioId = userInfo[0]?.portfolio_id;

  // Fetch portfolio companies data by portfolio id tying to user
  const { data: portfolioList } = await supabase
    .from('portfolio_companies')
    .select('*, companies(*) ')
    .eq('portfolio_id', userPortfolioId);

  return {
    userInfo: userInfo[0] || {},
    companyInfo: companyInfo[0] || {},
    portfolioList: portfolioList || [],
    tableIdentifier: tableIdentifier || '',
    hdyhau: hdyhau || '',
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
      <div className='w-[95%] max-xl:w-full overflow-x-hidden '>{children}</div>
    </div>
  );
};

export default Layout;
