export const STATUS_STYLES: Record<string, string> = {
  Upcoming: "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20",
  Active:
    "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
  Completed: "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-500/20",
  Cancelled: "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20",
};

export const STATUS_DOT: Record<string, string> = {
  Upcoming: "bg-blue-500",
  Active: "bg-emerald-500",
  Completed: "bg-slate-400",
  Cancelled: "bg-rose-500",
};

export const STATUS_TABS = [
  "All",
  "Upcoming",
  "Active",
  "Completed",
  "Cancelled",
] as const;
