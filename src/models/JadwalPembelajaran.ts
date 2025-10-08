import { Schema, model, models } from "mongoose";

const JadwalPembelajaranSchema = new Schema({
  image_url: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const JadwalPembelajaran =
  models.JadwalPembelajaran ||
  model("JadwalPembelajaran", JadwalPembelajaranSchema);

export default JadwalPembelajaran;
