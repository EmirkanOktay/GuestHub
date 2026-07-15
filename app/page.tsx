import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
    const getCurrentCookie = await cookies();
    const getToken = getCurrentCookie.get("token")?.value;

    if (getToken) {
        redirect("/dashboard");
    }

    redirect('/auth')
}   