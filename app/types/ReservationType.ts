export interface Customer {
    _id: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
}

export interface Room {
    _id: string;
    roomNumber: number;
    roomType: "Single" | "Double" | "Suite" | "Deluxe";
}

export interface Reservation {
    _id: string;
    customer: Customer;
    rooms: Room;
    checkInDate: string;
    checkOutDate: string;
    guestCount: number;
    totalAmount?: number;
    paidAmount: number;
    paymentMethod?: "Cash" | "CreditCard" | "DebitCard" | "BankTransfer";
    status: "Upcoming" | "Active" | "Completed" | "Cancelled";
    createdAt: string;
    updatedAt: string;
}