import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Modal from "./Modal";
import StudentForm from "./StudentForm";

const DashHeader = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <>
      <header className="dash-header">
        <div className="dash-header-inner">
          {/* Logo */}
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

          {/* Nav */}
          <nav className={`dash-nav ${menuOpen ? "open" : ""}`}>
            {/* Home goes to landing page */}
            <a
              className={location.pathname === "/" ? "active" : ""}
              onClick={() => { navigate("/"); setMenuOpen(false); }}
            >
              Home
            </a>
            <a
              className={isActive("/dashboard")}
              onClick={() => { navigate("/dashboard"); setMenuOpen(false); }}
            >
              Dashboard
            </a>
            <a
              className={isActive("/students")}
              onClick={() => { navigate("/students"); setMenuOpen(false); }}
            >
              Students
            </a>
            <a
              className={isActive("/courses")}
              onClick={() => { navigate("/courses"); setMenuOpen(false); }}
            >
              Courses
            </a>
          </nav>

          {/* Right side */}
          <div className="dash-header-right">
            <div className="dash-user">
              <div className="dash-avatar">{user?.name?.[0]?.toUpperCase() || "U"}</div>
              <div className="dash-user-info">
                <span className="dash-user-name">{user?.name}</span>
                <span className="dash-user-role">{user?.role}</span>
              </div>
            </div>

            {/* Enroll button — visible to both admin and staff */}
            <button className="btn-add" onClick={() => setShowModal(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
              </svg>
              Enroll Student
            </button>

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

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <StudentForm onSuccess={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default DashHeader;