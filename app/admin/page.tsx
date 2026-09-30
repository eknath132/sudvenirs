import {redirect} from 'next/navigation';import {isAdmin} from '@/lib/auth';import Workspace from '../workspace';
export const dynamic='force-dynamic';
export default async function Admin(){if(!await isAdmin())redirect('/login');return <Workspace mode="admin"/>;}
