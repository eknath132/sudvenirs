import {redirect} from 'next/navigation';import {isAdmin} from '@/lib/auth';import LoginForm from './form';
export const dynamic='force-dynamic';export default async function Login(){if(await isAdmin())redirect('/admin');return <LoginForm/>;}
