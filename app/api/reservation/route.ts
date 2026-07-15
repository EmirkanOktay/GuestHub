import dbConnect from "@/app/lib/mongodb";
import Reservation from "@/app/model/Reservation";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT!;

export async function GET(request: NextRequest) {
    await dbConnect();

    const token = request.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json({ error: "No Cookies" }, { status: 401 });
    }

    try {

        const reservation = await Reservation.find({});

        return NextResponse.json({ reservation });
    } catch (error) {
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
        let decoded: { userId: string; email: string; role: string };
        try {
            decoded = jwt.verify(token, JWT_SECRET) as {
                userId: string;
                email: string;
                role: string;
            };
        } catch {
            return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
        }

        const { name, surname, email, password, role } = await request.json();

        if (!name || !surname || !email || !password || !role) {
            return NextResponse.json(
                { error: "Empty Fields Must Be Fill" },
                { status: 400 },
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: "Password must be at least 6 characters" },
                { status: 400 },
            );
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            surname,
            email,
            password: hashPassword,
            role,
        });

        return NextResponse.json(
            {
                message: "User Has Been Created",
                user: {
                    id: newUser._id,
                },
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

export async function DELETE(request: NextRequest) {
    await dbConnect();

    const token = request.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json({ error: "No Cookies" }, { status: 401 });
    }

    try {
        let decoded: { userId: string; email: string; role: string };
        try {
            decoded = jwt.verify(token, JWT_SECRET) as {
                userId: string;
                email: string;
                role: string;
            };
        } catch {
            return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
        }

        if (decoded.role !== "Admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }
        const { userId } = await request.json();

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json(
                { error: "User is not existed" },
                { status: 404 },
            );
        }

        await User.findByIdAndDelete(userId);

        return NextResponse.json(
            {
                message: "User Has Been Deleted",
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

