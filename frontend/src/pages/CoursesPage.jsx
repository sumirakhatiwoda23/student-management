import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../context/StudentContext";
import Modal from "../components/Modal";
import StudentForm from "../components/StudentForm";
import DashHeader from "../components/DashHeader";

const ALL_COURSES = [
  { name: "Computer Science",      icon: "💻", color: "#f59e0b", desc: "Learn programming, algorithms, and software engineering fundamentals." },
  { name: "Mathematics",           icon: "📐", color: "#10b981", desc: "Master calculus, algebra, statistics, and mathematical reasoning." },
  { name: "Physics",               icon: "⚛️", color: "#3b82f6", desc: "Explore mechanics, thermodynamics, electromagnetism, and quantum physics." },
  { name: "Chemistry",             icon: "🧪", color: "#f43f5e", desc: "Study atomic structure, chemical reactions, and molecular biology." },
  { name: "Biology",               icon: "🧬", color: "#22c55e", desc: "Understand living organisms, ecosystems, and life sciences." },
  { name: "Engineering",           icon: "⚙️", color: "#06b6d4", desc: "Apply science and math to design and build innovative solutions." },
  { name: "Business",              icon: "💼", color: "#8b5cf6", desc: "Develop business strategy, management, and leadership skills." },
  { name: "Economics",             icon: "📈", color: "#f97316", desc: "Analyze markets, financial systems, and economic policy." },
  { name: "Psychology",            icon: "🧠", color: "#ec4899", desc: "Study human behavior, mental processes, and psychological theories." },
  { name: "Design",                icon: "🎨", color: "#a855f7", desc: "Create visual solutions through typography, color, and composition." },
  { name: "Literature",            icon: "📖", color: "#14b8a6", desc: "Explore great works of fiction, poetry, and literary criticism." },
  { name: "History",               icon: "🏛️", color: "#84cc16", desc: "Study civilizations, events, and the forces that shaped our world." },
  { name: "Data Science",          icon: "📊", color: "#0ea5e9", desc: "Analyze data using machine learning and statistical methods." },
  { name: "Medicine",              icon: "🩺", color: "#ef4444", desc: "Study anatomy, physiology, and clinical medical practice." },
  { name: "Law",                   icon: "⚖️", color: "#78716c", desc: "Understand legal systems, constitutional law, and justice." },
  { name: "Architecture",          icon: "🏗️", color: "#d97706", desc: "Design functional and beautiful buildings and urban spaces." },
  { name: "Environmental Science", icon: "🌿", color: "#16a34a", desc: "Study ecosystems, climate change, and environmental policy." },
  { name: "Sociology",             icon: "👥", color: "#7c3aed", desc: "Examine society, social behavior, and cultural institutions." },
  { name: "Philosophy",            icon: "🤔", color: "#64748b", desc: "Explore fundamental questions about existence, knowledge, and ethics." },
  { name: "Art & Music",           icon: "🎵", color: "#db2777", desc: "Develop creative expression through visual arts and musical performance." },
];

const CoursesPage = () => {
  // enrolledMap is pre-computed in context from allStudents — no local fetch needed
  const { enrolledMap, globalLoading } = useContext(StudentContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleEnroll = (courseName) => {
    setSelectedCourse(courseName);
    setShowModal(true);
  };

  const handleViewStudents = (courseName) => {
    navigate(`/students?course=${encodeURIComponent(courseName)}`);
  };

  return (
    <div className="dashboard">
      <DashHeader />

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
              <div
                className="course-card"
                key={course.name}
                style={{ "--course-color": course.color }}
              >
                <div className="cc-top">
                  <div className="cc-icon" style={{ background: course.color + "20" }}>
                    {course.icon}
                  </div>

                  {/* Show a subtle skeleton pulse while loading, real count after */}
                  <div
                    className={`cc-badge ${globalLoading ? "cc-badge-loading" : ""}`}
                    style={{
                      background: globalLoading ? undefined : course.color + "15",
                      color:      globalLoading ? undefined : course.color,
                    }}
                  >
                    {globalLoading ? "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0" : `${count} student${count !== 1 ? "s" : ""}`}
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
                  <button
                    className="cc-details"
                    onClick={() => handleViewStudents(course.name)}
                  >
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