// src/app/api/ekstrakurikuler/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Ekstrakurikuler from "@/models/Ekstrakurikuler";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function connect() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI!);
  }
}

export async function GET() {
  await connect();
  const data = await Ekstrakurikuler.find().sort({ created_at: -1 });
  return NextResponse.json({ success: true, data });
}

export async function POST(req: Request) {
  try {
    await connect();
    const formData = await req.formData();

    const title = (formData.get("title") as string) || "";
    const description = (formData.get("description") as string) || "";
    const file = formData.get("image") as File | null;

    if (!title) {
      return NextResponse.json({ success: false, message: "Title is required" }, { status: 400 });
    }
    if (!file) {
      return NextResponse.json({ success: false, message: "Image is required" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "ekstrakurikuler" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as UploadApiResponse);
        }
      );
      stream.end(buffer);
    });

    const created = await Ekstrakurikuler.create({
      title,
      description,
      image_url: uploadResult.secure_url,
    });

    return NextResponse.json({ success: true, data: created });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, message: "Unknown error" }, { status: 500 });
  }
}
