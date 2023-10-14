import bcrypt from 'bcrypt';
import connectMongoDB from '@/lib/mongoConnect';
import { NextResponse } from 'next/server';
import User from '@/mongoModels/UserModel';

export async function POST(request) {
  try {
    await connectMongoDB(); // Connect to the MongoDB database

    // Parse the JSON request data
    const data = await request.json();
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ 'data.email': data.data.email });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        msg: 'User with the same email already exists.',
        data: null,
      });
    }

    // Hash the user's password using bcrypt
    const hashedPassword = await bcrypt.hash(data.data.password, 10);

    // Create a new user document with the hashed password
    const user = new User({
      data: {
        ...data.data,
        password: hashedPassword, // Store the hashed password
      },
      Faces: data.faces,
    });

    // Save the user document to the database
    await user.save();

    return NextResponse.json({
      success: true,
      msg: 'User data saved to the database.',
      data: data,
    });
  } catch (error) {
    console.error('An error occurred:', error);
    return NextResponse.json({
      success: false,
      msg: 'ERROR! User data NOT saved to the database.',
      data: null,
    });
  }
}
