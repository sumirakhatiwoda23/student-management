import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";
import { StudentContext } from "../context/StudentContext";
import { AuthContext } from "../context/AuthContext";
import Modal from "../components/Modal";
import DashHeader from "../components/DashHeader";

const Home = () => {
  const { students, pagination } = useContext(StudentContext);
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const courses       = [...new Set(students.map((s) => s.course).filter(Boolean))];
  const totalStudents = pagination?.total ?? students.length;
  const totalCourses  = courses.length;

  const stats = [
    {
      label: "Total Students", value: totalStudents, color: "#f59e0b",
      link: "/students",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round"/>
      </svg>,
    },
    {
      label: "Courses Enrolled", value: totalCourses, color: "#10b981",
      link: "/courses",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>,
    },
    {
      label: "Total Courses Available", value: 20, color: "#8b5cf6",
      link: "/courses",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>,
    },
    {
      label: "Active Today", value: totalStudents > 0 ? Math.floor(totalStudents * 0.7) : 0, color: "#06b6d4",
      link: "/students",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>,
    },
  ];

  return (
    <div className="dashboard">
      <DashHeader />

      <div className="dash-page-title">
        <div>
          <h2>Dashboard</h2>
          <p>Welcome back, <strong>{user?.name}</strong> 👋</p>
        </div>
        {/* Single Enroll Student button here */}
        <button className="btn-add" onClick={() => setShowModal(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
            <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
          </svg>
          Enroll Student
        </button>
      </div>

      <div className="dash-stats">
        {stats.map((s) => (
          <div
            className="dash-stat-card"
            key={s.label}
            style={{ "--accent": s.color }}
            onClick={() => navigate(s.link)}
          >
            <div className="dsc-icon">{s.icon}</div>
            <div className="dsc-body">
              <div className="dsc-value">{s.value}</div>
              <div className="dsc-label">{s.label}</div>
            </div>
            <div className="dsc-arrow">→</div>
          </div>
        ))}
      </div>

      <div className="dash-main">
        <div className="dash-section-header">
          <h3>All Students</h3>
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