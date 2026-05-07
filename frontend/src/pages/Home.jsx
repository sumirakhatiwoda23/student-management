import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";
import { StudentContext } from "../context/StudentContext";
import { AuthContext } from "../context/AuthContext";
import Modal from "../components/Modal";

const Home = () => {
  const { students, pagination } = useContext(StudentContext);
  const { user, logout }         = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen]  = useState(false);
  const navigate = useNavigate();

  const courses      = [...new Set(students.map((s) => s.course).filter(Boolean))];
  const totalStudents = pagination?.total ?? students.length;
  const totalCourses  = courses.length;
  const isAdmin       = user?.role === "admin";

  const stats = [
    {
      label: "Total Students", value: totalStudents, color: "#f59e0b", bg: "#fffbeb",
      link: "/students",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round"/>
      </svg>
    },
    {
      label: "Courses", value: totalCourses, color: "#10b981", bg: "#ecfdf5",
      link: "/courses",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    },
    {
      label: "Total Courses Available", value: 20, color: "#8b5cf6", bg: "#f5f3ff",
      link: "/courses",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    },
    {
      label: "Active Today", value: totalStudents > 0 ? Math.floor(totalStudents * 0.7) : 0, color: "#06b6d4", bg: "#ecfeff",
      link: "/students",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    },
  ];

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

          <nav className={`dash-nav ${menuOpen ? "open" : ""}`}>
            <a onClick={() => { navigate("/dashboard"); setMenuOpen(false); }}>Dashboard</a>
            <a onClick={() => { navigate("/students"); setMenuOpen(false); }}>Students</a>
            <a onClick={() => { navigate("/courses"); setMenuOpen(false); }}>Courses</a>
          </nav>

          <div className="dash-header-right">
            <div className="dash-user">
              <div className="dash-avatar">{user?.name?.[0]?.toUpperCase() || "U"}</div>
              <div className="dash-user-info">
                <span className="dash-user-name">{user?.name}</span>
                <span className="dash-user-role">{user?.role}</span>
              </div>
            </div>
            {isAdmin && (
              <button className="btn-add" onClick={() => setShowModal(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
                </svg>
                Add Student
              </button>
            )}
            <button className="btn-logout" onClick={logout} title="Sign out">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round"/>
                <polyline points="16 17 21 12 16 7" strokeLinecap="round"/>
                <line x1="21" y1="12" x2="9" y2="12" strokeLinecap="round"/>
              </svg>
            </button>
            <button className="hamburger dash-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Page Title */}
      <div className="dash-page-title">
        <div>
          <h2>Dashboard</h2>
          <p>Welcome back, <strong>{user?.name}</strong> 👋</p>
        </div>
      </div>

      {/* Stats */}
      <div className="dash-stats">
        {stats.map((s) => (
          <div className="dash-stat-card" key={s.label} style={{ "--accent": s.color, "--bg": s.bg }}
            onClick={() => navigate(s.link)}>
            <div className="dsc-icon">{s.icon}</div>
            <div className="dsc-body">
              <div className="dsc-value">{s.value}</div>
              <div className="dsc-label">{s.label}</div>
            </div>
            <div className="dsc-arrow">→</div>
          </div>
        ))}
      </div>

      {/* Student List */}
      <div className="dash-main">
        <div className="dash-section-header">
          <h3>All Students</h3>
          {isAdmin && (
            <button className="btn-add-sm" onClick={() => setShowModal(true)}>+ Add Student</button>
          )}
        </div>
        <StudentList />
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <StudentForm onSuccess={() => setShowModal(false)} />
        </Modal>
      )}
    </div>
  );
};

export default Home;