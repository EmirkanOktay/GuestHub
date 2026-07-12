import dbConnect from "@/app/lib/mongodb";
import User from "@/app/model/User";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT!

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
            return NextResponse.json({ error: "User is not existed" }, { status: 404 });
        }

        await User.findOneAndDelete(userId)

        return NextResponse.json(
            {
                message: "User Has Been Deleted",
            },
            { status: 201 }
        );


    } catch (error) {
        return NextResponse.json({ error: "Server Error" + error }, { status: 500 });
    }
}