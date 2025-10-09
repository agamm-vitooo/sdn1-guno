// src/app/api/ekstrakurikuler/[id]/route.ts
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

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_req: Request, context: RouteContext) {
  await connect();
  const { id } = await context.params;
  const item = await Ekstrakurikuler.findById(id);
  if (!item) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, data: item });
}

export async function PUT(req: Request, context: RouteContext) {
  try {
    await connect();
    const { id } = await context.params;
    const formData = await req.formData();
    const title = (formData.get("title") as string) || null;
    const description = (formData.get("description") as string) || null;
    const file = formData.get("image") as File | null;

    const update: Partial<{ title: string; description: string; image_url: string }> = {};
    if (title !== null) update.title = title;
    if (description !== null) update.description = description;

    if (file) {
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
      update.image_url = uploadResult.secure_url;
    }

    const updated = await Ekstrakurikuler.findByIdAndUpdate(id, update, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, message: "Unknown error" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, context: RouteContext) {
  await connect();
  const { id } = await context.params;
  const item = await Ekstrakurikuler.findById(id);
  if (!item) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });

  // optional: remove image from cloudinary if we can derive public id
  const publicId = item.image_url.split("/").pop()?.split(".")[0];
  if (publicId) {
    try {
      await cloudinary.uploader.destroy(`ekstrakurikuler/${publicId}`);
    } catch {
      // ignore cloudinary delete error
    }
  }

  await Ekstrakurikuler.findByIdAndDelete(id);
  return NextResponse.json({ success: true, message: "Deleted successfully" });
}