"use client";

import { LogOut } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:3000/api/auth/logout");
            toast.success("Logout Has Been Successfully");
            router.push("/auth");
            router.refresh();
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    return (
        <LogOut
            size={16}
            className="shrink-0 cursor-pointer text-blue-100 hover:text-white transition-colors"
            onClick={handleLogout}
        />
    );
}