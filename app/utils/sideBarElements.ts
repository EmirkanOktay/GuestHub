import { SidebarItem } from "../types/SidebarType";
import {
    LayoutDashboard,
    ShieldCheck,
    DoorOpen,
    FileBarChart,
    Activity,
    Users,
    UserPlus,
    UserCog,
    FileText,
    CalendarRange,
    CalendarPlus,
    LogIn,
    type LucideIcon,
} from "lucide-react";


export const sideBarElements: SidebarItem[] = [
    { id: 1, value: "Dashboard", redirect: "/dashboard", role: "", icon: LayoutDashboard },
    { id: 2, value: "Admin Panel", redirect: "/admin/", role: "Admin", icon: ShieldCheck },
    { id: 3, value: "Manage Room", redirect: "/admin/manage-room", role: "Admin", icon: DoorOpen },
    { id: 4, value: "Reports", redirect: "/reports", role: "Admin", icon: FileBarChart },
    { id: 5, value: "Customer Activty", redirect: "/reports/customer-activty", role: "", icon: Activity },
    { id: 6, value: "Manage Room", redirect: "/manage-room/room-list", role: "", icon: DoorOpen },
    { id: 7, value: "Customers", redirect: "/customers", role: "", icon: Users },
    { id: 8, value: "Add Customer", redirect: "/customers/add", role: "Employee", icon: UserPlus },
    { id: 9, value: "Edit Customer", redirect: "/customers/edit", role: "Employee", icon: UserCog },
    { id: 10, value: "Create Invoice", redirect: "/payment/create-invoice", role: "Employee", icon: FileText },
    { id: 11, value: "Reservation", redirect: "/reservation/reservation-list", role: "", icon: CalendarRange },
    { id: 12, value: "New Reservation", redirect: "/reservationnew-reservation", role: "", icon: CalendarPlus },
    { id: 13, value: "Check In/ Check Out", redirect: "/reservation/checkin-checkout", role: "", icon: LogIn },
];