// pages/api/login.js
import bcrypt from 'bcrypt';
import connectMongoDB from '@/lib/mongoConnect';
import { NextResponse } from 'next/server';
import User from '@/mongoModels/UserModel';

export async function POST(request) {
  try {
    await connectMongoDB(); // Connect to the MongoDB database

    // Parse the JSON request data
    const data = await request.json();

    // Find the user with the provided email
    const user = await User.findOne({ 'data.email': data.email });

    if (!user) {
      return NextResponse.json({
        success: false,
        msg: 'User not found. Check your credentials.',
        data: null,
      });
    }

    // Verify the password using bcrypt
    const isPasswordValid = await bcrypt.compare(data.password, user.data.password);

    if (!isPasswordValid) {
      return NextResponse.json({
        success: false,
        msg: 'Invalid password. Check your credentials.',
        data: null,
      });
    }

    return NextResponse.json({
      success: true,
      msg: 'Login successful.',
      data: user.data,
    });
  } catch (error) {
    console.error('An error occurred:', error);
    return NextResponse.json({
      success: false,
      msg: 'Error during login.',
      data: null,
    });
  }
}
