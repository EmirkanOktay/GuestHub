import dbConnect from "@/app/lib/mongodb";
import Reservation from "@/app/model/Reservation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  await dbConnect();

  const token = request.cookies.get("token")?.value;

  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Id gerekli" }, { status: 400 });
  }

  if (!token) {
    return NextResponse.json({ error: "No Cookies" }, { status: 401 });
  }

  try {
    const reservation = await Reservation.findById(id)
      .populate("customer", "name surname email phone")
      .populate("rooms");
    return NextResponse.json({ reservation });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
