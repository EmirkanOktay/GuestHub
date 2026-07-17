
import { redirectIfAuthenticated } from "@/app/hooks/getCookies";
import LoginForm from "../auth/loginForm";

export default async function AuthPage() {
    await redirectIfAuthenticated();
    return <LoginForm />;
}