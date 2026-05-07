import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import StudentList from "../components/StudentList";
import StudentForm from "../components/StudentForm";
import Modal from "../components/Modal";

const StudentsPage = () => {
  const { user, logout } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const isAdmin = user?.role === "admin";

  return (
    <div className="dashboard">
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
            <a className="active" onClick={() => navigate("/students")}>Students</a>
            <a onClick={() => navigate("/courses")}>Courses</a>
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
          </div>
        </div>
      </header>

      <div className="dash-page-title">
        <div>
          <h2>Students</h2>
          <p>All enrolled students in the system</p>
        </div>
        {isAdmin && (
          <button className="btn-add" onClick={() => setShowModal(true)}>+ Add Student</button>
        )}
      </div>

      <div className="dash-main">
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

export default StudentsPage;