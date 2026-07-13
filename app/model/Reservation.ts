import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    guestCount: { type: Number, default: 1 },
    totalAmount: { type: Number },
    paidAmount: { type: Number, default: 0 },
    paymentMethod: { type: String, enum: ["Cash", "CreditCard", "DebitCard", "BankTransfer"] },
    status: { type: String, enum: ["Upcoming", "Active", "Completed", "Cancelled"], default: "Upcoming" },
}, { timestamps: true });

export default mongoose.models.Reservation || mongoose.model("Reservation", ReservationSchema);