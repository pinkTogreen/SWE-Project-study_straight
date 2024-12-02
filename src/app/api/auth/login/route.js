import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { username, password } = await req.json();
        console.log('Login attempt for username:', username);

        await connectDB();
        console.log('Connected to MongoDB');

        const user = await User.findOne({ username });
        console.log('User found:', !!user);

        if (!user || user.password !== password) {
            console.log('Login failed: Invalid credentials');
            return NextResponse.json(
                { error: "Invalid username or password" },
                { status: 401 }
            );
        }

        console.log('Login successful');
        return NextResponse.json(
            { success: true },
            { status: 200 }
        );

    } catch (error) {
        console.error("Login error details:", error);
        return NextResponse.json(
            { error: "An error occurred during login" },
            { status: 500 }
        );
    }
} 