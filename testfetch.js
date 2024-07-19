import supabase from './utils/supabase';

const fetchUserInfo = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', 'johndoe@user.com'); // Hardcoded email for testing

  if (error) {
    console.error('Error fetching user info:', error);
    return null;
  }

  return data[0];
};

fetchUserInfo().then((data) => console.log(data));
