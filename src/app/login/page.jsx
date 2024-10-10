import LogInBox from './_components/loginbox';
import LoginGraphic from './_components/loginGraphic';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function LoginPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If the user is authenticated, redirect to '/dashboard/snapshot'
  if (user) {
    redirect('/snapshot');
  }

  return (
    <div className='flex overflow-hidden bg-[#BF854F]'>
      <LogInBox />
      <LoginGraphic />
    </div>
  );
}
