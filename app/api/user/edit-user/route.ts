import dbConnect from "@/app/lib/mongodb";
import User from "@/app/model/User";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT!;

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

        const { password, rePassword, newPassword, userId } = await request.json();

        if (!password || !rePassword || !newPassword) {
            return NextResponse.json(
                { error: "Empty Fields Must Be Fill" },
                { status: 400 }
            );
        }

        if (password !== rePassword) {
            return NextResponse.json(
                { error: "Passwords do not match" },
                { status: 400 }
            );
        }

        if (newPassword.length < 6) {
            return NextResponse.json(
                { error: "Password must be at least 6 characters" },
                { status: 400 }
            );
        }

        const targetUserId = decoded.role === "Admin" && userId ? userId : decoded.userId;

        if (decoded.role !== "Admin") {
            const currentUser = await User.findById(decoded.userId);

            if (!currentUser) {
                return NextResponse.json({ error: "User Not Found" }, { status: 404 });
            }

            const isPasswordCorrect = await bcrypt.compare(
                password,
                currentUser.password
            );

            if (!isPasswordCorrect) {
                return NextResponse.json(
                    { error: "Current password is incorrect" },
                    { status: 400 }
                );
            }
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);

        const updatedUser = await User.findByIdAndUpdate(
            targetUserId,
            { $set: { password: hashPassword } },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ error: "User Not Found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Password Has Been Updated" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Server Error" + error },
            { status: 500 }
        );
    }
}