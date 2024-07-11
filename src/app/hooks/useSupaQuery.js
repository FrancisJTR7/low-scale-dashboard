import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase/server';

const fetchUsers = async () => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const useFetchUsers = () => {
  return useQuery(['users'], fetchUsers);
};

export default useFetchUsers;
