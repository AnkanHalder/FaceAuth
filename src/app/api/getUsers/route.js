import connectMongoDB from "@/lib/mongoConnect";
import { NextResponse } from "next/server";
import User from "@/mongoModels/UserModel";

export async function GET() {
  try {
    await connectMongoDB(); // Connect to the MongoDB database

    const users = await User.find();

    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ success: false, error: "Failed to retrieve users", data: null });
  }
}
