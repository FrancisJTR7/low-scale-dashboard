import { useQuery } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';

const fetchCompanyInfo = async (userId) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};

const useCompanyInfo = (userId) => {
  return useQuery({
    queryKey: ['companyInfo', userId],
    queryFn: () => fetchCompanyInfo(userId),
    enabled: !!userId,
  });
};

export default useCompanyInfo;
