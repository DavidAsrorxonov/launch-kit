import { connectToDatabase } from "@/lib/db";
import Feedback from "@/models/feedback";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json(
        { error: "Feedback message is required." },
        { status: 400 },
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: "Feedback message must be at least 10 characters." },
        { status: 400 },
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { error: "Feedback message must be under 1000 characters." },
        { status: 400 },
      );
    }

    await connectToDatabase();

    await Feedback.create({
      email,
      message,
    });

    return NextResponse.json(
      { success: true, message: "Feedback submitted successfully." },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Feedback API error:", error);

    return NextResponse.json(
      { error: "Failed to submit feedback." },
      { status: 500 },
    );
  }
}
