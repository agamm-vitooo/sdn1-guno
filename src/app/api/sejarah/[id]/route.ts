// src/api/sejarah/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Sejarah from "@/models/Sejarah";
import cloudinary from "@/lib/cloudinary";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  await connectDB();

  const item = await Sejarah.findById(id).lean();
  if (!item) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });

  return NextResponse.json({ success: true, data: item });
}

export async function PUT(req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  await connectDB();

  const formData = await req.formData();
  const title = formData.get("title") as string | null;
  const description = formData.get("description") as string | null;
  const file = formData.get("file") as File | null;

  const item = await Sejarah.findById(id);
  if (!item) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });

  // jika ada file baru, upload dan hapus lama
  if (file) {
    // hapus gambar lama kalau ada
    if (item.image_url) {
      // ambil public id dari url
      const parts = item.image_url.split("/");
      const last = parts.pop() || "";
      const publicId = last.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`sejarah/${publicId}`).catch(() => {});
      }
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const upload = await cloudinary.uploader.upload(
      `data:${file.type};base64,${buffer.toString("base64")}`,
      { folder: "sejarah" }
    );
    item.image_url = upload.secure_url;
  }

  if (title) item.title = title;
  if (description) item.description = description;

  await item.save();
  return NextResponse.json({ success: true, data: item });
}

export async function DELETE(_req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  await connectDB();

  const item = await Sejarah.findById(id);
  if (!item) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });

  if (item.image_url) {
    const parts = item.image_url.split("/");
    const last = parts.pop() || "";
    const publicId = last.split(".")[0];
    if (publicId) {
      await cloudinary.uploader.destroy(`sejarah/${publicId}`).catch(() => {});
    }
  }

  await Sejarah.findByIdAndDelete(id);
  return NextResponse.json({ success: true, message: "Deleted" });
}