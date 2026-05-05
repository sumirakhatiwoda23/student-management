import { deleteStudent } from "../services/studentService";

const StudentRow = ({ student, fetchStudents, navigate }) => {
  const handleDelete = async () => {
    await deleteStudent(student._id);
    fetchStudents();
  };

  return (
    <tr className="border">
      <td className="p-2">{student.name}</td>
      <td className="p-2">{student.email}</td>
      <td className="p-2">{student.age}</td>
      <td className="p-2">{student.course}</td>
      <td className="p-2 space-x-2">
        <button
          onClick={() => navigate(`/edit/${student._id}`)}
          className="bg-yellow-400 px-2 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default StudentRow;