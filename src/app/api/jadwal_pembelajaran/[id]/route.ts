import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import JadwalPembelajaran from "@/models/JadwalPembelajaran";
import cloudinary from "@/lib/cloudinary";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

// ======================
// GET single jadwal
// ======================
export async function GET(
  req: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;

  await connectDB();

  if (!id)
    return NextResponse.json(
      { success: false, message: "ID is required" },
      { status: 400 }
    );

  const item = await JadwalPembelajaran.findById(id);
  if (!item)
    return NextResponse.json(
      { success: false, message: "Not found" },
      { status: 404 }
    );

  return NextResponse.json({ success: true, data: item });
}

// ======================
// PUT / update jadwal
// ======================
export async function PUT(
  req: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;

  await connectDB();

  if (!id)
    return NextResponse.json(
      { success: false, message: "ID is required" },
      { status: 400 }
    );

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file)
    return NextResponse.json(
      { success: false, message: "No file uploaded" },
      { status: 400 }
    );

  const buffer = Buffer.from(await file.arrayBuffer());
  const upload = await cloudinary.uploader.upload(
    `data:${file.type};base64,${buffer.toString("base64")}`,
    { folder: "jadwal_pembelajaran" }
  );

  const updated = await JadwalPembelajaran.findByIdAndUpdate(
    id,
    { image_url: upload.secure_url },
    { new: true }
  );

  return NextResponse.json({ success: true, data: updated });
}

// ======================
// DELETE / hapus jadwal
// ======================
export async function DELETE(
  req: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;

  await connectDB();

  if (!id)
    return NextResponse.json(
      { success: false, message: "ID is required" },
      { status: 400 }
    );

  const item = await JadwalPembelajaran.findById(id);
  if (!item)
    return NextResponse.json(
      { success: false, message: "Not found" },
      { status: 404 }
    );

  const publicId = item.image_url.split("/").pop()?.split(".")[0];
  if (publicId)
    await cloudinary.uploader.destroy(`jadwal_pembelajaran/${publicId}`);

  await JadwalPembelajaran.findByIdAndDelete(id);
  return NextResponse.json({ success: true, message: "Deleted" });
}