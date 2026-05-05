import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStudent, updateStudent } from "../services/studentService";

const COURSES = [
  "Computer Science", "Mathematics", "Physics", "Chemistry",
  "Biology", "Engineering", "Business", "Economics",
  "Psychology", "Design", "Literature", "History",
];

const validate = (form) => {
  const errors = {};
  if (!form.name?.trim()) errors.name = "Name is required";
  if (!form.email?.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Invalid email";
  if (!form.age) errors.age = "Age is required";
  else if (Number(form.age) < 5 || Number(form.age) > 100) errors.age = "Age must be 5–100";
  if (!form.course) errors.course = "Course is required";
  return errors;
};

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", age: "", course: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getStudent(id);
        setForm(res.data);
      } catch { navigate("/"); }
      finally { setFetching(false); }
    };
    load();
  }, [id, navigate]);

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
      await updateStudent(id, form);
      setSuccess(true);
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  if (fetching) {
    return (
      <div className="edit-page">
        <div className="edit-container loading-state">
          <div className="page-spinner" />
          <p>Loading student…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-page">
      <div className="edit-container">
        {/* Back button */}
        <button className="back-btn" onClick={() => navigate("/")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Dashboard
        </button>

        <div className="edit-card">
          <div className="edit-header">
            <div className="edit-badge">EDITING</div>
            <h1>Update Student</h1>
            <p>Modify the details for <strong>{form.name || "this student"}</strong></p>
          </div>

          {success ? (
            <div className="form-success">
              <div className="success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="32" height="32">
                  <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>Updated!</h3>
              <p>Redirecting to dashboard…</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-grid">
                {[
                  { label: "Full Name", name: "name", type: "text", placeholder: "Jane Smith" },
                  { label: "Email Address", name: "email", type: "email", placeholder: "jane@university.edu" },
                  { label: "Age", name: "age", type: "number", placeholder: "22" },
                ].map(({ label, name, type, placeholder }) => (
                  <div className="form-field" key={name}>
                    <label className="form-label">{label}</label>
                    <input
                      type={type}
                      name={name}
                      value={form[name] || ""}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className={`form-input ${errors[name] ? "error" : ""}`}
                    />
                    {errors[name] && <span className="form-error">{errors[name]}</span>}
                  </div>
                ))}

                <div className="form-field">
                  <label className="form-label">Course</label>
                  <select
                    name="course"
                    value={form.course || ""}
                    onChange={handleChange}
                    className={`form-input form-select ${errors.course ? "error" : ""}`}
                  >
                    <option value="">Select a course…</option>
                    {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.course && <span className="form-error">{errors.course}</span>}
                </div>
              </div>

              <div className="form-actions edit-actions">
                <button type="button" className="btn-secondary" onClick={() => navigate("/")}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? (
                    <><span className="spinner white" /> Saving…</>
                  ) : (
                    <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" strokeLinecap="round"/>
                      <polyline points="17 21 17 13 7 13 7 21" strokeLinecap="round"/>
                      <polyline points="7 3 7 8 15 8" strokeLinecap="round"/>
                    </svg> Save Changes</>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditStudent;