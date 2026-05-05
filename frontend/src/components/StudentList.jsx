import { useContext, useState } from "react";
import { StudentContext } from "../context/StudentContext";
import { useNavigate } from "react-router-dom";
import StudentRow from "./StudentRow";
import SearchBar from "./SearchBar";

const StudentList = () => {
  const { students, fetchStudents } = useContext(StudentContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-5">
      <SearchBar search={search} setSearch={setSearch} />

      <table className="table-auto w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Age</th>
            <th className="p-2">Course</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((student) => (
            <StudentRow
              key={student._id}
              student={student}
              fetchStudents={fetchStudents}
              navigate={navigate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;