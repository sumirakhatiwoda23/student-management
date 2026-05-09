import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import StudentList from "../components/StudentList";
import StudentForm from "../components/StudentForm";
import Modal from "../components/Modal";
import DashHeader from "../components/DashHeader";

const StudentsPage = () => {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="dashboard">
      <DashHeader />

      <div className="dash-page-title">
        <div>
          <h2>Students</h2>
          <p>All enrolled students in the system</p>
        </div>
        <button className="btn-add" onClick={() => setShowModal(true)}>
          + Enroll Student
        </button>
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