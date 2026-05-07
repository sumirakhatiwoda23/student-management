import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  course: { type: String, required: true },
  avatar: { type: String, default: null }, // relative path to uploaded file
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);