import Student from "../models/student.js";
import fs from "fs";

// CREATE
export const createStudent = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.file) data.avatar = req.file.filename;
    const student = await Student.create(data);
    return res.status(201).json(student);
  } catch (err) {
    return next(err);
  }
};

// GET ALL — with pagination, search & course filter
export const getStudents = async (req, res, next) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
    const skip  = (page - 1) * limit;

    const query = {};

    if (req.query.search) {
      const re = new RegExp(req.query.search, "i");
      query.$or = [{ name: re }, { email: re }, { course: re }];
    }

    if (req.query.course && req.query.course !== "all") {
      query.course = req.query.course;
    }

    const [students, total] = await Promise.all([
      Student.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Student.countDocuments(query),
    ]);

    return res.json({
      students,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// GET ONE
export const getStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.json(student);
  } catch (err) {
    return next(err);
  }
};

// UPDATE (with optional new avatar)
export const updateStudent = async (req, res, next) => {
  try {
    const existing = await Student.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: "Student not found" });
    }

    const data = { ...req.body };

    if (req.file) {
      // Remove old avatar file if it exists
      if (existing.avatar) {
        const oldPath = `uploads/profiles/${existing.avatar}`;
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      data.avatar = req.file.filename;
    }

    const student = await Student.findByIdAndUpdate(req.params.id, data, { new: true });
    return res.json(student);
  } catch (err) {
    return next(err);
  }
};

// DELETE (also removes avatar)
export const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student?.avatar) {
      const filePath = `uploads/profiles/${student.avatar}`;
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    await Student.findByIdAndDelete(req.params.id);
    return res.json({ message: "Deleted successfully" });
  } catch (err) {
    return next(err);
  }
};