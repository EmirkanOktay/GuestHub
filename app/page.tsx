import { requireAuth } from './hooks/getCookies';
import { redirect } from 'next/navigation';

export default async function Home() {
    await requireAuth();
    redirect("/dashboard");
}