"use client";

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Inbox,
  AlertCircle,
  BedDouble,
} from "lucide-react";
import { Reservation } from "../types/ReservationType";

const STATUS_STYLES: Record<string, string> = {
  Upcoming: "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20",
  Active:
    "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
  Completed: "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-500/20",
  Cancelled: "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20",
};

const STATUS_DOT: Record<string, string> = {
  Upcoming: "bg-blue-500",
  Active: "bg-emerald-500",
  Completed: "bg-slate-400",
  Cancelled: "bg-rose-500",
};

const PAYMENT_LABELS: Record<string, string> = {
  Cash: "Cash",
  CreditCard: "Credit Cart",
  DebitCard: "Debit Cart",
  BankTransfer: "Bank Transfer",
};

const ROOM_TYPE_LABELS: Record<string, string> = {
  Single: "Single",
  Double: "Double",
  Suite: "Suite",
  Deluxe: "Deluxe",
};

const STATUS_TABS = [
  "All",
  "Upcoming",
  "Active",
  "Completed",
  "Cancelled",
] as const;

function formatCurrency(value?: number) {
  if (value === undefined || value === null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function initials(name?: string, surname?: string) {
  if (!name || !surname) return "—";
  return `${name[0]}${surname[0]}`.toUpperCase();
}

export default function GetReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof STATUS_TABS)[number]>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const pageSize = 10;

  useEffect(() => {
    const getReservations = async () => {
      try {
        const request = await axios.get(
          "http://localhost:3000/api/reservation",
          {
            withCredentials: true,
          },
        );
        setReservations(request.data.reservation ?? []);
      } catch (err) {
        setError("Error.");
      } finally {
        setLoading(false);
      }
    };

    getReservations();
  }, []);

  const filtered = useMemo(() => {
    return reservations.filter((r) => {
      const matchesStatus = statusFilter === "All" || r.status === statusFilter;
      const q = query.trim().toLowerCase();
      const fullName =
        `${r.customer?.name ?? ""} ${r.customer?.surname ?? ""}`.toLowerCase();
      const matchesQuery =
        q === "" ||
        fullName.includes(q) ||
        r.customer?.email?.toLowerCase().includes(q) ||
        String(r.rooms?.roomNumber ?? "").includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [reservations, query, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [query, statusFilter]);

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
              Reservations
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {loading
                ? "Loading"
                : `${filtered.length} Reservations are listing...`}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-slate-200">
            <div className="flex items-center gap-1 overflow-x-auto">
              {STATUS_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={` cursor-pointer px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                    statusFilter === tab
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 w-full sm:w-72 transition-colors"
              />
            </div>
          </div>

          {loading ? (
            <div className="divide-y divide-slate-100">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 px-5 py-4 animate-pulse"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0" />
                  <div className="h-3 bg-slate-200 rounded w-1/6" />
                  <div className="h-3 bg-slate-200 rounded w-1/6" />
                  <div className="h-3 bg-slate-200 rounded w-1/12" />
                  <div className="h-3 bg-slate-200 rounded w-1/6 ml-auto" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
              <AlertCircle className="w-8 h-8 text-rose-400" />
              <p className="text-sm font-medium text-slate-700">{error}</p>
              <p className="text-xs text-slate-400">Refresh The Page.</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
              <Inbox className="w-8 h-8 text-slate-300" />
              <p className="text-sm font-medium text-slate-700">
                No Reservations
              </p>
              <p className="text-xs text-slate-400">No Reservations.</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide">
                      <th className="px-5 py-3">Full Name</th>
                      <th className="px-5 py-3">Room</th>
                      <th className="px-5 py-3">Date</th>
                      <th className="px-5 py-3 text-center">Person Number</th>
                      <th className="px-5 py-3 text-right">Price</th>
                      <th className="px-5 py-3">Payment</th>
                      <th className="px-5 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginated.map((r) => {
                      const paid = r.paidAmount ?? 0;
                      const total = r.totalAmount ?? 0;
                      const isPartiallyPaid = paid > 0 && paid < total;

                      return (
                        <tr
                          key={r._id}
                          className="hover:bg-slate-50/80 transition-colors"
                        >
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold flex items-center justify-center shrink-0">
                                {initials(
                                  r.customer?.name,
                                  r.customer?.surname,
                                )}
                              </div>
                              <div>
                                <div className="text-slate-900 font-medium">
                                  {r.customer?.name} {r.customer?.surname}
                                </div>
                                <div className="text-xs text-slate-400">
                                  {r.customer?.email ?? "—"}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2">
                              <BedDouble className="w-4 h-4 text-slate-400 shrink-0" />
                              <div>
                                <div className="text-slate-700 font-medium">
                                  Room : {r.rooms?.roomNumber ?? "—"}
                                </div>
                                <div className="text-xs text-slate-400">
                                  {r.rooms?.roomType
                                    ? (ROOM_TYPE_LABELS[r.rooms.roomType] ??
                                      r.rooms.roomType)
                                    : ""}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3.5 whitespace-nowrap text-slate-700">
                            {formatDate(r.checkInDate)}
                            <span className="text-slate-300 mx-1.5">→</span>
                            {formatDate(r.checkOutDate)}
                          </td>
                          <td className="px-5 py-3.5 text-center text-slate-600">
                            {r.guestCount}
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            <div className="font-medium text-slate-900">
                              {formatCurrency(total)}
                            </div>
                            {isPartiallyPaid && (
                              <div className="text-xs text-amber-600">
                                {formatCurrency(paid)}Paid
                              </div>
                            )}
                          </td>
                          <td className="px-5 py-3.5 text-slate-600 whitespace-nowrap">
                            {r.paymentMethod
                              ? (PAYMENT_LABELS[r.paymentMethod] ??
                                r.paymentMethod)
                              : "—"}
                          </td>
                          <td className="px-5 py-3.5">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                                STATUS_STYLES[r.status] ??
                                "bg-slate-100 text-slate-600"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[r.status] ?? "bg-slate-400"}`}
                              />
                              {r.status}
                            </span>
                            <button
                              className={` w-auto cursor-pointer px-3 py-1.5 ml-5 rounded-md text-sm whitespace-nowrap bg-blue-600 text-white hover:w-36 h-10 transition-colors`}
                            >
                              Go To Details
                              <Search className="inline ml-2 h-4 w-5 mb-1 " />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between px-5 py-4 border-t border-slate-200">
                <p className="text-xs text-slate-500">
                  Page{" "}
                  <span className="font-medium text-slate-700">
                    {currentPage}
                  </span>{" "}
                  / {totalPages}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    aria-label="Previous sayfa"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    aria-label="Next sayfa"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
