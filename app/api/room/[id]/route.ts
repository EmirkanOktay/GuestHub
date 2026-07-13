import dbConnect from "@/app/lib/mongodb";
import Room from "@/app/model/Room";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT!;

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;

    await dbConnect();
    const token = request.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json({ error: "No Cookies" }, { status: 401 });
    }

    try {

        const room = await Room.findById(id);

        return NextResponse.json({ room });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
export async function PUT(request: NextRequest) {
    await dbConnect();

    const token = request.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json({ error: "No Cookies" }, { status: 401 });
    }

    try {
        let decoded: { RoomId: string; email: string; role: string };
        try {
            decoded = jwt.verify(token, JWT_SECRET) as {
                RoomId: string;
                email: string;
                role: string;
            };
        } catch {
            return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
        }

        if (decoded.role !== "Admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const {
            roomId,
            roomNumber,
            roomType,
            price,
            capacity,
            floor,
            amenities,
            description,
        } = await request.json();

        if (!roomId) {
            return NextResponse.json({ error: "roomId is required" }, { status: 400 });
        }

        const updateFields: Record<string, unknown> = {};

        if (roomNumber !== undefined) updateFields.roomNumber = roomNumber;
        if (roomType !== undefined) updateFields.roomType = roomType;
        if (price !== undefined) updateFields.price = price;
        if (capacity !== undefined) updateFields.capacity = capacity;
        if (floor !== undefined) updateFields.floor = floor;
        if (amenities !== undefined) updateFields.amenities = amenities;
        if (description !== undefined) updateFields.description = description;

        if (Object.keys(updateFields).length === 0) {
            return NextResponse.json(
                { error: "No fields provided to update" },
                { status: 400 },
            );
        }

        const updatedRoom = await Room.findByIdAndUpdate(
            roomId,
            { $set: updateFields },
            { new: true, runValidators: true },
        );

        if (!updatedRoom) {
            return NextResponse.json({ error: "Room Not Found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Room Has Been Updated", room: updatedRoom },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Server Error" + error },
            { status: 500 },
        );
    }
}