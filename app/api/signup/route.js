// /app/api/signup/route.js (Next.js 13+ App Router)
import User from "@/models/User";
import bcrypt from "bcrypt";
import { connect } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connect();

    const body = await req.json();
    const { name, email, user_name, password } = body;

    // Input validation (optional but good practice)
    if (!name || !email || !user_name || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists." },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      user_name,
      password: hashedPassword,
    });

    // Return created user (omit password for security)
    const { password: _, ...userWithoutPassword } = newUser._doc;

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Server error during signup." },
      { status: 500 }
    );
  }
}
