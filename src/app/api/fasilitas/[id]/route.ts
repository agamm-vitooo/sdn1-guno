import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Fasilitas from "@/models/Fasilitas";

// ✅ Type untuk context
type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

// ✅ GET Fasilitas by ID
export async function GET(_req: Request, context: RouteContext) {
  await mongoose.connect(process.env.MONGO_URI!);
  const { id } = await context.params;
  const fasilitas = await Fasilitas.findById(id);
  return NextResponse.json({ success: true, data: fasilitas });
}

// ✅ UPDATE Fasilitas
export async function PUT(req: Request, context: RouteContext) {
  await mongoose.connect(process.env.MONGO_URI!);
  const { id } = await context.params;
  const body = await req.json();
  const fasilitas = await Fasilitas.findByIdAndUpdate(
    id,
    body,
    { new: true }
  );
  return NextResponse.json({ success: true, data: fasilitas });
}

// ✅ DELETE Fasilitas
export async function DELETE(_req: Request, context: RouteContext) {
  await mongoose.connect(process.env.MONGO_URI!);
  const { id } = await context.params;
  await Fasilitas.findByIdAndDelete(id);
  return NextResponse.json({ success: true, message: "Deleted successfully" });
}