import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { userType } from '../types/UserType';

export async function requireAuth() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        redirect("/auth");
    }

    return token;
}

export async function redirectIfAuthenticated() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (token) {
        redirect("/dashboard");
    }
}

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    try {
        return jwtDecode<userType>(token);
    } catch (error) {
        console.error("Token decode hatası:", error);
        return null;
    }
}