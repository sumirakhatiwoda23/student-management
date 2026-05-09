import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../context/StudentContext";
import { AuthContext } from "../context/AuthContext";
import Modal from "../components/Modal";
import StudentForm from "../components/StudentForm";

const ALL_COURSES = [
  { name: "Computer Science",    icon: "💻", color: "#f59e0b", desc: "Learn programming, algorithms, and software engineering fundamentals." },
  { name: "Mathematics",         icon: "📐", color: "#10b981", desc: "Master calculus, algebra, statistics, and mathematical reasoning." },
  { name: "Physics",             icon: "⚛️", color: "#3b82f6", desc: "Explore mechanics, thermodynamics, electromagnetism, and quantum physics." },
  { name: "Chemistry",           icon: "🧪", color: "#f43f5e", desc: "Study atomic structure, chemical reactions, and molecular biology." },
  { name: "Biology",             icon: "🧬", color: "#22c55e", desc: "Understand living organisms, ecosystems, and life sciences." },
  { name: "Engineering",         icon: "⚙️", color: "#06b6d4", desc: "Apply science and math to design and build innovative solutions." },
  { name: "Business",            icon: "💼", color: "#8b5cf6", desc: "Develop business strategy, management, and leadership skills." },
  { name: "Economics",           icon: "📈", color: "#f97316", desc: "Analyze markets, financial systems, and economic policy." },
  { name: "Psychology",          icon: "🧠", color: "#ec4899", desc: "Study human behavior, mental processes, and psychological theories." },
  { name: "Design",              icon: "🎨", color: "#a855f7", desc: "Create visual solutions through typography, color, and composition." },
  { name: "Literature",          icon: "📖", color: "#14b8a6", desc: "Explore great works of fiction, poetry, and literary criticism." },
  { name: "History",             icon: "🏛️", color: "#84cc16", desc: "Study civilizations, events, and the forces that shaped our world." },
  { name: "Data Science",        icon: "📊", color: "#0ea5e9", desc: "Analyze data using machine learning and statistical methods." },
  { name: "Medicine",            icon: "🩺", color: "#ef4444", desc: "Study anatomy, physiology, and clinical medical practice." },
  { name: "Law",                 icon: "⚖️", color: "#78716c", desc: "Understand legal systems, constitutional law, and justice." },
  { name: "Architecture",        icon: "🏗️", color: "#f59e0b", desc: "Design functional and beautiful buildings and urban spaces." },
  { name: "Environmental Science",icon: "🌿", color: "#16a34a", desc: "Study ecosystems, climate change, and environmental policy." },
  { name: "Sociology",           icon: "👥", color: "#7c3aed", desc: "Examine society, social behavior, and cultural institutions." },
  { name: "Philosophy",          icon: "🤔", color: "#64748b", desc: "Explore fundamental questions about existence, knowledge, and ethics." },
  { name: "Art & Music",         icon: "🎵", color: "#db2777", desc: "Develop creative expression through visual arts and musical performance." },
];

const CoursesPage = () => {
  const { students } = useContext(StudentContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Count enrolled students per course
  const enrolledMap = {};
  students.forEach((s) => {
    if (s.course) enrolledMap[s.course] = (enrolledMap[s.course] || 0) + 1;
  });

  const handleEnroll = (courseName) => {
    setSelectedCourse(courseName);
    setShowModal(true);
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dash-header">
        <div className="dash-header-inner">
          <div className="dash-logo" onClick={() => navigate("/")}>
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <span className="dash-logo-title">Academia</span>
              <span className="dash-logo-sub">Student Management</span>
            </div>
          </div>
          <nav className="dash-nav">
            <a onClick={() => navigate("/dashboard")}>Dashboard</a>
            <a onClick={() => navigate("/students")}>Students</a>
            <a className="active" onClick={() => navigate("/courses")}>Courses</a>
          </nav>
          <div className="dash-header-right">
            <div className="dash-user">
              <div className="dash-avatar">{user?.name?.[0]?.toUpperCase() || "U"}</div>
              <div className="dash-user-info">
                <span className="dash-user-name">{user?.name}</span>
                <span className="dash-user-role">{user?.role}</span>
              </div>
            </div>
            <button className="btn-add" onClick={() => setShowModal(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
              </svg>
              Add Student
            </button>
            <button className="btn-logout" onClick={logout} title="Sign out">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round"/>
                <polyline points="16 17 21 12 16 7" strokeLinecap="round"/>
                <line x1="21" y1="12" x2="9" y2="12" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="dash-page-title">
        <div>
          <h2>Courses</h2>
          <p>All {ALL_COURSES.length} available courses — click Enroll to add a student</p>
        </div>
      </div>

      <div className="dash-main">
        <div className="courses-grid">
          {ALL_COURSES.map((course) => {
            const count = enrolledMap[course.name] || 0;
            return (
              <div className="course-card" key={course.name} style={{ "--course-color": course.color }}>
                <div className="cc-top">
                  <div className="cc-icon" style={{ background: course.color + "20" }}>
                    {course.icon}
                  </div>
                  <div className="cc-badge" style={{ background: course.color + "15", color: course.color }}>
                    {count} student{count !== 1 ? "s" : ""}
                  </div>
                </div>
                <h3 className="cc-title">{course.name}</h3>
                <p className="cc-desc">{course.desc}</p>
                <div className="cc-footer">
                  <button
                    className="cc-enroll"
                    style={{ background: course.color }}
                    onClick={() => handleEnroll(course.name)}
                  >
                    Enroll Student
                  </button>
                  <button className="cc-details" onClick={() => navigate("/students")}>
                    View Students →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showModal && (
        <Modal onClose={() => { setShowModal(false); setSelectedCourse(null); }}>
          <StudentForm
            defaultCourse={selectedCourse}
            onSuccess={() => { setShowModal(false); setSelectedCourse(null); }}
          />
        </Modal>
      )}
    </div>
  );
};

export default CoursesPage;