import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI!; // simpan di .env.local

export async function GET() {
  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();

    const db = client.db("test");
    const collection = db.collection("ekstrakurikulers");

    const extraCount = await collection.countDocuments();

    await client.close();

    return NextResponse.json({ extracurriculars: extraCount });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ extracurriculars: 0 }, { status: 500 });
  }
}

