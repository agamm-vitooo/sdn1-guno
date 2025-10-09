// src/models/Ekstrakurikuler.ts
import mongoose, { Schema } from "mongoose";

const EkstraSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    image_url: { type: String, required: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.models.Ekstrakurikuler ||
  mongoose.model("Ekstrakurikuler", EkstraSchema);
