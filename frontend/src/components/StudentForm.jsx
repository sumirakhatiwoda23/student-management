import { useState, useContext } from "react";
import { createStudent } from "../services/studentService";
import { StudentContext } from "../context/StudentContext";
import AvatarUpload from "./AvatarUpload";

const COURSES = [
  "Computer Science", "Mathematics", "Physics", "Chemistry",
  "Biology", "Engineering", "Business", "Economics",
  "Psychology", "Design", "Literature", "History",
];

const validate = (form) => {
  const errors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  else if (form.name.trim().length < 2) errors.name = "Name too short";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Invalid email";
  if (!form.age) errors.age = "Age is required";
  else if (Number(form.age) < 5 || Number(form.age) > 100) errors.age = "Age must be 5–100";
  if (!form.course) errors.course = "Course is required";
  return errors;
};

const StudentForm = ({ onSuccess }) => {
  const { fetchStudents, queryParams } = useContext(StudentContext);
  const [form, setForm]     = useState({ name: "", email: "", age: "", course: "" });
  const [avatarFile, setAvatarFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      const payload = new FormData();
      Object.entries(form).forEach(([k, v]) => payload.append(k, v));
      if (avatarFile) payload.append("avatar", avatarFile);

      await createStudent(payload);
      await fetchStudents({ ...queryParams, page: 1 });
      setSuccess(true);
      setTimeout(() => { setSuccess(false); onSuccess?.(); }, 1200);
      setForm({ name: "", email: "", age: "", course: "" });
      setAvatarFile(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="form-success">
        <div className="success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="32" height="32">
            <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3>Student Added!</h3>
        <p>The student has been successfully enrolled.</p>
      </div>
    );
  }

  return (
    <div className="student-form">
      <div className="form-header">
        <h2>Enroll New Student</h2>
        <p>Fill in the details below to add a student to the system</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Avatar upload spans full width */}
        <div style={{ marginBottom: 20 }}>
          <AvatarUpload current={null} onChange={setAvatarFile} />
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange}
              placeholder="e.g. Jane Smith"
              className={`form-input ${errors.name ? "error" : ""}`} autoFocus />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-field">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" value={form.email} onChange={handleChange}
              placeholder="jane@university.edu"
              className={`form-input ${errors.email ? "error" : ""}`} />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-field">
            <label className="form-label">Age</label>
            <input type="number" name="age" value={form.age} onChange={handleChange}
              placeholder="22" min="5" max="100"
              className={`form-input ${errors.age ? "error" : ""}`} />
            {errors.age && <span className="form-error">{errors.age}</span>}
          </div>

          <div className="form-field">
            <label className="form-label">Course</label>
            <select name="course" value={form.course} onChange={handleChange}
              className={`form-input form-select ${errors.course ? "error" : ""}`}>
              <option value="">Select a course…</option>
              {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.course && <span className="form-error">{errors.course}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary btn-full" disabled={loading}>
            {loading ? (
              <><span className="spinner white" /> Enrolling…</>
            ) : (
              <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" strokeLinecap="round"/>
                  <circle cx="9" cy="7" r="4"/>
                  <line x1="19" y1="8" x2="19" y2="14" strokeLinecap="round"/>
                  <line x1="22" y1="11" x2="16" y2="11" strokeLinecap="round"/>
                </svg> Enroll Student</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;