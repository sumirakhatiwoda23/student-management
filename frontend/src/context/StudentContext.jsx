import { createContext, useState, useCallback } from "react";
import * as api from "../services/studentService";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents]       = useState([]);
  const [pagination, setPagination]   = useState(null);
  const [queryParams, setQueryParams] = useState({ page: 1, limit: 10, search: "", course: "all" });

  const fetchStudents = useCallback(async (params = queryParams) => {
    try {
      const cleanParams = {
        page:  params.page  || 1,
        limit: params.limit || 10,
        ...(params.search && { search: params.search }),
        ...(params.course && params.course !== "all" && { course: params.course }),
      };
      const res = await api.getStudents(cleanParams);
      setStudents(res.data.students);
      setPagination(res.data.pagination);
      setQueryParams(params);
    } catch (err) {
      console.error("fetchStudents error:", err);
    }
  }, [queryParams]);

  return (
    <StudentContext.Provider value={{ students, pagination, queryParams, fetchStudents }}>
      {children}
    </StudentContext.Provider>
  );
};