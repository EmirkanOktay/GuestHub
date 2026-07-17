import { requireAuth } from './hooks/getCookies';

export default async function Home() {
    await requireAuth();
}   