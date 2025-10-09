import mongoose, { Schema } from "mongoose";

const FasilitasSchema = new Schema(
  {
    title: { type: String, required: true },
    image_url: { type: String, required: true },
  },
  { timestamps: { createdAt: "created_at" } }
);

export default mongoose.models.Fasilitas ||
  mongoose.model("Fasilitas", FasilitasSchema);
