// app/api/users/route.js
import dbConnect from "@/app/lib/mongodb";
import User from "@/app/model/User";

export async function GET() {
  await dbConnect();
  const users = await User.find({});
  return Response.json({ users });
}
