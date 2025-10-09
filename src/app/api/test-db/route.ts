// src/app/api/test-db/route.ts
import mongoose from "mongoose";

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    return Response.json({ success: true, message: "Connected to MongoDB ✅" });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error occurred";
    return Response.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
