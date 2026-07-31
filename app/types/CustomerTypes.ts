export type CustomerStatus =
    | "Active"
    | "CheckedOut"
    | "Blacklisted";

export type PaymentMethod =
    | "Cash"
    | "CreditCard"
    | "DebitCard"
    | "BankTransfer";

export type Customer = {
    _id?: string;
    customerId?: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    identityNumber?: string;
    birthDate?: string;
    nationality?: string;
    address?: {
        country?: string;
        city?: string;
        details?: string;
    };
    currentRoom?: string;
    status?: CustomerStatus;
    notes?: string;
    checkInDate?: string;
    checkOutDate: string;
    paymentMethod?: PaymentMethod;
    paidAmount?: number;
    guestCount?: number;
    createdAt?: string;
    updatedAt?: string;
};

export type createCustomer = {
    name: string;
    surname: string;
    email: string;
    phone: string;
    identityNumber?: string;
    birthDate?: string;
    nationality?: string;
    address?: {
        country?: string;
        city?: string;
        details?: string;
    };
    currentRoom?: string;
    status?: CustomerStatus;
    notes?: string;
    checkInDate?: string;
    checkOutDate: string;
    paymentMethod?: PaymentMethod;
    paidAmount?: number;
    guestCount?: number;
    createdAt?: string;
    updatedAt?: string;
}