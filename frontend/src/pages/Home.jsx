import { useContext, useState } from "react";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";
import { StudentContext } from "../context/StudentContext";
import Modal from "../components/Modal";

const StatCard = ({ label, value, icon, color }) => (
  <div className="stat-card" style={{ "--accent": color }}>
    <div className="stat-icon">{icon}</div>
    <div className="stat-body">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
    <div className="stat-glow" />
  </div>
);

const Home = () => {
  const { students } = useContext(StudentContext);
  const [showModal, setShowModal] = useState(false);

  const courses = [...new Set(students.map((s) => s.course).filter(Boolean))];
  const avgAge = students.length
    ? Math.round(students.reduce((a, s) => a + Number(s.age || 0), 0) / students.length)
    : 0;

  return (
    <div className="home">
      {/* Header */}
      <header className="app-header">
        <div className="header-left">
          <div className="logo-mark">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h1 className="app-title">Academia</h1>
            <p className="app-sub">Student Management System</p>
          </div>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          Add Student
        </button>
      </header>

      {/* Stats */}
      <section className="stats-grid">
        <StatCard label="Total Students" value={students.length} color="#f59e0b"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round"/></svg>}
        />
        <StatCard label="Courses" value={courses.length} color="#10b981"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>}
        />
        <StatCard label="Average Age" value={avgAge || "—"} color="#8b5cf6"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round"/><line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round"/><line x1="3" y1="10" x2="21" y2="10" strokeLinecap="round"/></svg>}
        />
        <StatCard label="Active Today" value={students.length > 0 ? Math.floor(students.length * 0.7) : 0} color="#06b6d4"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        />
      </section>

      {/* Main content */}
      <main className="main-content">
        <StudentList />
      </main>

      {/* Modal */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <StudentForm onSuccess={() => setShowModal(false)} />
        </Modal>
      )}
    </div>
  );
};

export default Home;