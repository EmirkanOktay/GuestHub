export type SidebarItem = {
    id: number;
    value: string;
    redirect: string;
    role: "" | "Admin" | "Employee";
    icon: any;
};