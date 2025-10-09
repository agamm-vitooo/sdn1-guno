import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Fasilitas from "@/models/Fasilitas";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  await mongoose.connect(process.env.MONGO_URI!);
  const data = await Fasilitas.find().sort({ created_at: -1 });
  return NextResponse.json({ success: true, data });
}

export async function POST(req: Request) {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const file = formData.get("image") as File;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload ke Cloudinary dengan tipe yang benar
    const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "fasilitas" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as UploadApiResponse);
        }
      );
      stream.end(buffer);
    });

    const fasilitas = await Fasilitas.create({
      title,
      image_url: uploadResult.secure_url,
    });

    return NextResponse.json({ success: true, data: fasilitas });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
    return NextResponse.json(
      { success: false, message: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
