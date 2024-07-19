import { useQuery } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';

const fetchPortfolioList = async (userPortfolioId) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('portfolio_companies')
    .select('*, companies(company_name)')
    .eq('portfolio_id', userPortfolioId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const usePortfolioList = (userPortfolioId) => {
  return useQuery({
    queryKey: ['portfolioList', userPortfolioId],
    queryFn: () => fetchPortfolioList(userPortfolioId),
    enabled: !!userPortfolioId,
  });
};

export default usePortfolioList;
