'use server';

import { signOut } from '@/auth.config';
import { redirect } from 'next/dist/server/api-utils';


export const logout = async() => {

  await signOut();
redirect('/login');


}