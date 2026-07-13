import dbConnect from "@/app/lib/mongodb";
import User from "@/app/model/User";
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

    const user = await User.findById(id);

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
