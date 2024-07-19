import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';

const fetchUserInfo = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', 'johndoe@user.com'); // Hardcoded email for testing

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};

const useUserInfo = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
  });
};

export default useUserInfo;
