import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../context/StudentContext";
import { AuthContext } from "../context/AuthContext";

const COURSE_META = {
  "Computer Science": { icon: "💻", color: "#f59e0b", desc: "Learn programming, algorithms, and software engineering fundamentals." },
  "Psychology":       { icon: "🧠", color: "#8b5cf6", desc: "Study human behavior, mental processes, and psychological theories." },
  "Mathematics":      { icon: "📐", color: "#10b981", desc: "Master calculus, algebra, statistics, and mathematical reasoning." },
  "Data Science":     { icon: "📊", color: "#06b6d4", desc: "Analyze data using machine learning and statistical methods." },
  "Business Admin":   { icon: "💼", color: "#f43f5e", desc: "Develop business strategy, management, and leadership skills." },
  "Engineering":      { icon: "⚙️", color: "#3b82f6", desc: "Apply science and math to design and build innovative solutions." },
  "default":          { icon: "📚", color: "#6b7280", desc: "Explore this course and expand your knowledge." },
};

const CoursesPage = () => {
  const { students } = useContext(StudentContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Build courses from student data
  const courseMap = {};
  students.forEach((s) => {
    if (!s.course) return;
    if (!courseMap[s.course]) courseMap[s.course] = [];
    courseMap[s.course].push(s);
  });

  const courses = Object.entries(courseMap).map(([name, enrolledStudents]) => ({
    name,
    count: enrolledStudents.length,
    students: enrolledStudents,
    ...(COURSE_META[name] || COURSE_META["default"]),
  }));

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
          <p>All available courses and enrolled students</p>
        </div>
      </div>

      <div className="dash-main">
        {courses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <p>No courses found</p>
            <span>Add students with courses to see them here</span>
          </div>
        ) : (
          <div className="courses-grid">
            {courses.map((course) => (
              <div className="course-card" key={course.name} style={{ "--course-color": course.color }}>
                <div className="cc-top">
                  <div className="cc-icon" style={{ background: course.color + "20" }}>
                    {course.icon}
                  </div>
                  <div className="cc-badge" style={{ background: course.color + "15", color: course.color }}>
                    {course.count} student{course.count !== 1 ? "s" : ""}
                  </div>
                </div>
                <h3 className="cc-title">{course.name}</h3>
                <p className="cc-desc">{course.desc}</p>

                {/* Enrolled students avatars */}
                <div className="cc-students">
                  {course.students.slice(0, 5).map((s, i) => (
                    <div key={s._id} className="cc-avatar" title={s.name}
                      style={{ background: ["#f59e0b","#10b981","#8b5cf6","#06b6d4","#f43f5e"][i % 5], zIndex: 5 - i }}>
                      {s.name?.[0]?.toUpperCase()}
                    </div>
                  ))}
                  {course.count > 5 && (
                    <div className="cc-avatar cc-avatar-more">+{course.count - 5}</div>
                  )}
                </div>

                <div className="cc-footer">
                  <button className="cc-enroll" style={{ background: course.color }}
                    onClick={() => navigate("/dashboard")}>
                    Enroll Now
                  </button>
                  <button className="cc-details" onClick={() => navigate("/students")}>
                    View Students →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;