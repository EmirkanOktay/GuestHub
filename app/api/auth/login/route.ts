import dbConnect from "@/app/lib/mongodb";
import User from "@/app/model/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT!

export async function POST(request: NextRequest) {
    const connectDb = await dbConnect()

    if (!connectDb) {
        return NextResponse.json({ error: "Database Error" }, { status: 404 });
    }

    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email or Password cannot be empty!" }, { status: 404 });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return NextResponse.json({ error: "User not exist!" }, { status: 404 });
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            return NextResponse.json({ error: "Invalid E-mail or Password!" }, { status: 404 });
        }

        const token = jwt.sign({ userId: user.userId, name: user.name, surname: user.surname, role: user.role, email: user.email },
            JWT_SECRET, { expiresIn: "7d" });

        const response = NextResponse.json({
            message: "Login Has Been Succesful",
            loginToken: token
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
            path: "/dashboard"
        });

        return response;

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    }

}
