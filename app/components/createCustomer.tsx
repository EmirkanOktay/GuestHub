"use client";

import { User, Mail, Phone, MapPin, CreditCard, Calendar } from "lucide-react";
import {
  createCustomer as CreateCustomerInput,
  PaymentMethod,
} from "../types/CustomerTypes";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const initialValues: CreateCustomerInput = {
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
  guestCount: 0,
};

function CreateCustomer() {
  const [values, setValues] = useState<CreateCustomerInput>(initialValues);

  const paymentMethods = ["Cash", "Credit Card", "Debit Card", "Bank Transfer"];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    // Nested fields, e.g. "address.country"
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setValues((prev) => ({
        ...prev,
        [parent]: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(prev as any)[parent],
          [child]: value,
        },
      }));
      return;
    }

    // Numeric fields (guestCount, paidAmount)
    if (type === "number") {
      setValues((prev) => ({
        ...prev,
        [name]: value === "" ? 0 : Number(value),
      }));
      return;
    }

    // Plain fields
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createCustomer = async () => {
    // Flat required fields (address and numeric fields are checked separately)
    const requiredFields: (keyof CreateCustomerInput)[] = [
      "name",
      "surname",
      "email",
      "phone",
      "identityNumber",
      "birthDate",
      "nationality",
      "currentRoom",
      "checkInDate",
      "checkOutDate",
      "paymentMethod",
    ];

    const emptyField = requiredFields.find((field) => !values[field]);

    if (emptyField) {
      toast.error(`"${emptyField}" field cannot be empty`);
      return;
    }

    const requiredAddressFields: (keyof NonNullable<
      CreateCustomerInput["address"]
    >)[] = ["country", "city", "details"];

    const emptyAddressField = requiredAddressFields.find(
      (field) => !values.address?.[field],
    );
    if (emptyAddressField) {
      toast.error(`Address "${emptyAddressField}" cannot be empty`);
      return;
    }

    if (values.guestCount === undefined || values.guestCount <= 0) {
      toast.error("Guest count must be greater than 0");
      return;
    }

    if (values.paidAmount === undefined || values.paidAmount < 0) {
      toast.error("Paid amount cannot be negative");
      return;
    }

    try {
      const request = await axios.post(
        "http://localhost:3000/api/new-reservation/",
        values,
        { withCredentials: true },
      );

      if (request) {
        toast.success("New Customer Has Been Created");
        setValues(initialValues);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while creating the customer");
    }
  };

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
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                />
                <Input
                  icon={<User size={16} />}
                  label="Surname"
                  name="surname"
                  value={values.surname}
                  onChange={handleChange}
                />

                <Input
                  icon={<Mail size={16} />}
                  label="Email"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />

                <Input
                  icon={<Phone size={16} />}
                  label="Phone"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                />

                <Input
                  icon={<CreditCard size={16} />}
                  label="Identity Number"
                  name="identityNumber"
                  value={values.identityNumber?.toString() ?? ""}
                  onChange={handleChange}
                />
                <Input
                  icon={<Calendar size={16} />}
                  label="Birth Date"
                  type="date"
                  name="birthDate"
                  value={values.birthDate?.toString() ?? ""}
                  onChange={handleChange}
                />

                <Input
                  label="Nationality"
                  name="nationality"
                  value={values.nationality?.toString() ?? ""}
                  onChange={handleChange}
                />
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
                  name="address.country"
                  value={values.address?.country ?? ""}
                  onChange={handleChange}
                />

                <Input
                  icon={<MapPin size={16} />}
                  label="City"
                  name="address.city"
                  value={values.address?.city ?? ""}
                  onChange={handleChange}
                />

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-600 mb-2">
                    Address Details
                  </label>

                  <textarea
                    name="address.details"
                    value={values.address?.details ?? ""}
                    onChange={handleChange}
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
                  name="checkInDate"
                  value={values.checkInDate?.toString() ?? ""}
                  onChange={handleChange}
                />

                <Input
                  icon={<Calendar size={16} />}
                  label="Check Out Date"
                  type="date"
                  name="checkOutDate"
                  value={values.checkOutDate}
                  onChange={handleChange}
                />

                <Input
                  label="Guest Count"
                  type="number"
                  name="guestCount"
                  value={values.guestCount?.toString() ?? ""}
                  onChange={handleChange}
                />

                <Input
                  label="Paid Amount"
                  type="number"
                  name="paidAmount"
                  value={values.paidAmount?.toString() ?? ""}
                  onChange={handleChange}
                />

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">
                    Payment Method
                  </label>

                  <select
                    name="paymentMethod"
                    value={values.paymentMethod}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  >
                    {paymentMethods.map((method: string, index: number) => (
                      <option value={method} key={index}>
                        {method}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-4">Notes</h3>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Notes
                </label>

                <textarea
                  name="notes"
                  value={values.notes}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Additional customer notes..."
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 px-6 py-5 border-t border-slate-200 bg-slate-50">
            <button
              onClick={() => setValues(initialValues)}
              className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-white transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                createCustomer();
              }}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
            >
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
  name,
  value,
  onChange,
  type = "text",
  icon,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full rounded-lg border border-slate-200 bg-slate-50 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition ${
            icon ? "pl-10 pr-4" : "px-4"
          }`}
        />
      </div>
    </div>
  );
}

export default CreateCustomer;
