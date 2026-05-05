import { useState, useContext } from "react";
import { createStudent } from "../services/studentService";
import { StudentContext } from "../context/StudentContext";

const StudentForm = () => {
  const { fetchStudents } = useContext(StudentContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    course: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createStudent(form);
    fetchStudents();
    setForm({ name: "", email: "", age: "", course: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded space-y-3">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 w-full" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 w-full" />
      <input name="age" value={form.age} onChange={handleChange} placeholder="Age" className="border p-2 w-full" />
      <input name="course" value={form.course} onChange={handleChange} placeholder="Course" className="border p-2 w-full" />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Student</button>
    </form>
  );
};

export default StudentForm;