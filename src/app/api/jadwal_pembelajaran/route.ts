import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import JadwalPembelajaran from "@/models/JadwalPembelajaran";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  await connectDB();
  const data = await JadwalPembelajaran.find().sort({ created_at: -1 });
  return NextResponse.json({ success: true, data });
}

export async function POST(req: NextRequest) {
  await connectDB();
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file)
    return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const upload = await cloudinary.uploader.upload(
    `data:${file.type};base64,${buffer.toString("base64")}`,
    { folder: "jadwal_pembelajaran" }
  );

  const item = await JadwalPembelajaran.create({ image_url: upload.secure_url });
  return NextResponse.json({ success: true, data: item });
}
