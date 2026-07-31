"use client";

import {
    User,
    Mail,
    Phone,
    MapPin,
    CreditCard,
    Calendar,
} from "lucide-react";
import { createCustomer, PaymentMethod } from "../types/CustomerTypes";
import { useState } from "react";

const initialValues = {
    name: "",
    surname: "",
    email: "",
    phone: "",
    identityNumber: "",
    birthDate: "",
    nationality: "",
    address: {
        country: "",
        city: "",
        details: "",
    },
    currentRoom: "",
    notes: "",
    checkInDate: "",
    checkOutDate: "",
    paymentMethod: "Cash" as PaymentMethod,
    paidAmount: 0,
    guestCount: 0
};

function CreateCustomer() {

    const [values, setValues] = useState<createCustomer>(initialValues);

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-slate-900">
                        Create Customer
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Add a new customer and reservation information.
                    </p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-200">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Customer Information
                        </h2>
                    </div>

                    <div className="p-6 space-y-8">
                        <div>
                            <h3 className="text-sm font-medium text-slate-700 mb-4">
                                Personal Details
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    icon={<User size={16} />}
                                    label="Name"
                                />
                                <Input
                                    icon={<User size={16} />}
                                    label="Surname"
                                />

                                <Input
                                    icon={<Mail size={16} />}
                                    label="Email"
                                    type="email"
                                />
                                <Input
                                    icon={<Phone size={16} />}
                                    label="Phone"
                                />

                                <Input
                                    icon={<CreditCard size={16} />}
                                    label="Identity Number"
                                />
                                <Input
                                    icon={<Calendar size={16} />}
                                    label="Birth Date"
                                    type="date"
                                />

                                <Input label="Nationality" />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-slate-700 mb-4">
                                Address Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    icon={<MapPin size={16} />}
                                    label="Country"
                                />
                                <Input
                                    icon={<MapPin size={16} />}
                                    label="City"
                                />

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-600 mb-2">
                                        Address Details
                                    </label>

                                    <textarea
                                        rows={4}
                                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-slate-700 mb-4">
                                Reservation Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    icon={<Calendar size={16} />}
                                    label="Check In Date"
                                    type="date"
                                />

                                <Input
                                    icon={<Calendar size={16} />}
                                    label="Check Out Date"
                                    type="date"
                                />

                                <Input
                                    label="Guest Count"
                                    type="number"
                                />

                                <Input
                                    label="Paid Amount"
                                    type="number"
                                />

                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-2">
                                        Payment Method
                                    </label>

                                    <select className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500">
                                        <option>Cash</option>
                                        <option>Credit Card</option>
                                        <option>Debit Card</option>
                                        <option>Bank Transfer</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-slate-700 mb-4">
                                Notes
                            </h3>

                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-2">
                                    Notes
                                </label>

                                <textarea
                                    rows={5}
                                    placeholder="Additional customer notes..."
                                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 px-6 py-5 border-t border-slate-200 bg-slate-50">
                        <button className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-white transition">
                            Cancel
                        </button>

                        <button className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
                            Create Customer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Input({
    label,
    type = "text",
    icon,
}: {
    label: string;
    type?: string;
    icon?: React.ReactNode;
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
                {label}
            </label>

            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        {icon}
                    </div>
                )}

                <input
                    type={type}
                    className={`w-full rounded-lg border border-slate-200 bg-slate-50 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition ${icon ? "pl-10 pr-4" : "px-4"
                        }`}
                />
            </div>
        </div>
    );
}

export default CreateCustomer;