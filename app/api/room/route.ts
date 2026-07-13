import dbConnect from "@/app/lib/mongodb";
import Room from "@/app/model/Room";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT!;

export async function GET(request: NextRequest) {
    await dbConnect();

    const token = request.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json({ error: "No Cookies" }, { status: 401 });
    }

    try {
        const Rooms = await Room.find({});

        return NextResponse.json({ Rooms });
    }
    catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    await dbConnect();

    const token = request.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json({ error: "No Cookies" }, { status: 401 });
    }


    try {
        const { roomType, price, capacity, floor, amenities, description, images } = await request.json();

        if (!roomType || !price || !capacity || !floor || !amenities || !description) {
            return NextResponse.json(
                { error: "Empty Fields Must Be Fill" },
                { status: 400 },
            );
        }

        const lastRoom = await Room.findOne({}).sort({ roomNumber: -1 });
        const roomNumber = lastRoom ? lastRoom.roomNumber + 1 : 1;

        const newRoom = await Room.create({
            roomNumber,
            roomType,
            price,
            capacity,
            floor,
            amenities,
            description,
            images
        });

        return NextResponse.json(
            {
                message: "Room Has Been Created",
                Room: {
                    roomNumber,
                    id: newRoom._id,
                },
            },
            { status: 201 },
        );
    }

    catch (error) {
        return NextResponse.json(
            { error: "Server Error" + error },
            { status: 500 },
        );
    }

}

export async function DELETE(request: NextRequest) {
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
        const { RoomId } = await request.json();

        const findRoom = await Room.findById(RoomId);

        if (!findRoom) {
            return NextResponse.json(
                { error: "Room is not existed" },
                { status: 404 },
            );
        }

        await Room.findByIdAndDelete(RoomId);

        return NextResponse.json(
            {
                message: "Room Has Been Deleted",
            },
            { status: 201 },
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Server Error" + error },
            { status: 500 },
        );
    }
}
