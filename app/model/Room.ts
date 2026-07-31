// models/Room.ts
import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    roomNumber: { type: Number, required: true, unique: true },
    roomType: {
      type: String,
      enum: ["Single", "Double", "Suite", "Deluxe"],
      required: true,
    },
    price: { type: Number, required: true },
    capacity: { type: Number, required: true, default: 1 },
    floor: { type: Number },
    status: {
      type: String,
      enum: ["Available", "Occupied", "Cleaning", "Maintenance"],
      default: "Available",
    },
    amenities: [{ type: String }], // ex: ["WiFi", "TV", "Minibar"]
    description: { type: String },
    images: [{ type: String }],
  },
  { timestamps: true },
);

export default mongoose.models.Room || mongoose.model("Room", RoomSchema);