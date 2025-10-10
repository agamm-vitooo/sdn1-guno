// src/api/sejarah/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Sejarah from "@/models/Sejarah";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  await connectDB();
  const items = await Sejarah.find().sort({ created_at: -1 }).lean();
  return NextResponse.json({ success: true, data: items });
}

export async function POST(req: NextRequest) {
  await connectDB();

  const formData = await req.formData();
  const title = formData.get("title") as string | null;
  const description = formData.get("description") as string | null;
  const file = formData.get("file") as File | null;

  if (!title || !description) {
    return NextResponse.json({ success: false, message: "title & description required" }, { status: 400 });
  }

  let image_url: string | undefined = undefined;

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const upload = await cloudinary.uploader.upload(
      `data:${file.type};base64,${buffer.toString("base64")}`,
      { folder: "sejarah" }
    );
    image_url = upload.secure_url;
  }

  const created = await Sejarah.create({ title, description, image_url, created_at: new Date() });
  return NextResponse.json({ success: true, data: created });
}
