import { createContext, useState, useEffect } from "react";
import * as api from "../services/studentService";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const res = await api.getStudents();
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <StudentContext.Provider value={{ students, fetchStudents }}>
      {children}
    </StudentContext.Provider>
  );
};