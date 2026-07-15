import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reservation: { type: mongoose.Schema.Types.ObjectId, ref: "Reservation", required: true },
    amount: { type: Number, required: true },
    paymentMethod: {
        type: String,
        enum: ["Cash", "CreditCard", "DebitCard", "BankTransfer"],
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Completed", "Failed", "Refunded"],
        default: "Pending"
    },
}, { timestamps: true });

export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);