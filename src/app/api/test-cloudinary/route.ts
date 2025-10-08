import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  try {
    // test koneksi Cloudinary
    const result = await cloudinary.api.ping();
    return NextResponse.json({ success: true, result });
  } catch (error: unknown) {
    console.error("Cloudinary error:", error);

    let message = "Unknown error occurred";
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === "string") {
      message = error;
    }

    return NextResponse.json({
      success: false,
      error: message,
    });
  }
}
