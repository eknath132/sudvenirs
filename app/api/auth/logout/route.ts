import {endSession} from '@/lib/auth';import {redirect} from 'next/navigation';
export async function GET(){await endSession();redirect('/login');}
