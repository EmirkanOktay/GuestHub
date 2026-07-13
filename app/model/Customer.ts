import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        customerId: { type: Number, unique: true },
        name: { type: String, required: true },
        surname: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        identityNumber: {
            type: String,
            unique: true,
            trim: true,
        },
        birthDate: { type: Date },
        nationality: { type: String },
        address: {
            country: { type: String },
            city: { type: String },
            details: { type: String },
        },
        currentRoom: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
        },
        status: {
            type: String,
            enum: ["Active", "CheckedOut", "Blacklisted"],
            default: "Active",
        },
        notes: { type: String },
        checkInDate: { type: Date },
        checkOutDate: { type: Date },
        paymentMethod: {
            type: String,
            enum: ["Cash", "CreditCard", "DebitCard", "BankTransfer"],
        },
        paidAmount: { type: Number, default: 0 },
        guestCount: { type: Number, default: 1 },
    },
    { timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", UserSchema);