import { body, validationResult } from "express-validator";

export const validateStudent = [
  body("name").notEmpty().withMessage("Name required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("age").isNumeric().withMessage("Age must be number"),
  body("course").notEmpty().withMessage("Course required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];