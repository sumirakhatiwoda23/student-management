import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  },
  course: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);