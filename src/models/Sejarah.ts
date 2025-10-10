// src/models/sejarah.ts
import mongoose, { Schema, Document, model } from "mongoose";

export interface ISejarah extends Document {
  title: string;
  description: string;
  image_url?: string;
  created_at: Date;
}

const SejarahSchema = new Schema<ISejarah>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image_url: { type: String },
    created_at: { type: Date, default: () => new Date() },
  },
  { timestamps: false }
);

const Sejarah =
  (mongoose.models.Sejarah as mongoose.Model<ISejarah>) ||
  model<ISejarah>("Sejarah", SejarahSchema);

export default Sejarah;
