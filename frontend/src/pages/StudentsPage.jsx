import { useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import StudentList from "../components/StudentList";
import StudentForm from "../components/StudentForm";
import Modal from "../components/Modal";
import DashHeader from "../components/DashHeader";

const StudentsPage = () => {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [searchParams] = useSearchParams();

  // Read ?course=... from URL (set by CoursesPage)
  const courseFilter = searchParams.get("course") || "all";

  return (
    <div className="dashboard">
      <DashHeader />

      <div className="dash-page-title">
        <div>
          <h2>Students</h2>
          <p>
            {courseFilter !== "all"
              ? `Showing students enrolled in: ${courseFilter}`
              : "All enrolled students in the system"}
          </p>
        </div>
        <button className="btn-add" onClick={() => setShowModal(true)}>
          + Enroll Student
        </button>
      </div>

      <div className="dash-main">
        {/* Pass the course filter down to StudentList */}
        <StudentList initialCourse={courseFilter} />
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