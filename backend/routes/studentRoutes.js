import express from "express";
import {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";
import { uploadProfile } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// All student routes require authentication
router.use(protect);

router.post("/",    uploadProfile, createStudent);       // admin + staff
router.get("/",    getStudents);                         // admin + staff
router.get("/:id", getStudent);                          // admin + staff
router.put("/:id", uploadProfile, updateStudent);        // admin + staff
router.delete("/:id", restrictTo("admin"), deleteStudent); 

export default router;