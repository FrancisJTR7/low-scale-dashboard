'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export async function login(formData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs

  //grabbing input from form and sending it to supabase
  //if we wanted to grab which type of person we would get it here after grabbing te type of person specified in the form
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  //if there is an error we redirect to the error page
  if (error) {
    redirect('/error');
  }
  //if there is no error we revalidate the path and redirect to snapshot
  revalidatePath('/', 'layout');
  redirect('/snapshot');
}

//connection between supabase and nextjs application
