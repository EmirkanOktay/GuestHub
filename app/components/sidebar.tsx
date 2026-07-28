import Link from "next/link";
import { getCurrentUser } from "../hooks/getCookies";
import { sideBarElements } from "../utils/sideBarElements";

export default async function Sidebar() {
    const user = await getCurrentUser();
    const userRole = user?.role ?? "";

    const visibleElements = sideBarElements.filter(
        (element) => element.role === "" || element.role === userRole
    );

    return (
        <aside className="w-64 min-h-screen bg-gradient-to-br from-blue-500 to-blue-900 flex flex-col relative overflow-hidden">
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full border border-blue-400/30 pointer-events-none" />
            <div className="absolute -bottom-40 -left-10 w-96 h-96 rounded-full border border-blue-400/20 pointer-events-none" />

            <div className="relative z-10 px-6 pt-8 pb-6">
                <h1 className="text-white text-2xl font-bold">GuestHub</h1>
            </div>

            <nav className="relative z-10 flex-1 px-3 space-y-1">
                {visibleElements.map((element) => {
                    const Icon = element.icon;
                    return (
                        <Link
                            key={element.id}
                            href={element.redirect}
                            className="flex items-center gap-3 px-4 py-3 rounded-full text-blue-100 text-sm font-medium hover:bg-white/10 hover:text-white transition-colors"
                        >
                            <Icon className="w-4 h-4 shrink-0" />
                            <span>{element.value}</span>
                        </Link>
                    );
                })}
            </nav>

            {user && (
                <div className="relative z-10 px-6 py-5 border-t border-blue-400/20">
                    <p className="text-blue-100 text-xs truncate">
                        {user.email ?? user.name ?? "Kullanıcı"}
                    </p>
                </div>
            )}
        </aside>
    );
}