import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStudent, updateStudent } from "../services/studentService";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    course: ""
  });

  useEffect(() => {
    const fetch = async () => {
      const res = await getStudent(id);
      setForm(res.data);
    };
    fetch();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateStudent(id, form);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 space-y-3">
      <input value={form.name} onChange={e => setForm({...form, name:e.target.value})} className="border p-2 w-full" />
      <input value={form.email} onChange={e => setForm({...form, email:e.target.value})} className="border p-2 w-full" />
      <input value={form.age} onChange={e => setForm({...form, age:e.target.value})} className="border p-2 w-full" />
      <input value={form.course} onChange={e => setForm({...form, course:e.target.value})} className="border p-2 w-full" />
      <button className="bg-green-500 text-white px-4 py-2">Update</button>
    </form>
  );
};

export default EditStudent;