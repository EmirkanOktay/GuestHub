import mongoose from "mongoose";

const MaintenanceSchema = new mongoose.Schema({
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    issue: { type: String, required: true },
    status: { type: String, enum: ["Pending", "InProgress", "Resolved"], default: "Pending" },
}, { timestamps: true });

export default mongoose.models.Maintenance || mongoose.model("Maintenance", MaintenanceSchema);