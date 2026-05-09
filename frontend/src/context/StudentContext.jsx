import { createContext, useState, useCallback, useEffect, useRef } from "react";
import * as api from "../services/studentService";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents]       = useState([]);
  const [allStudents, setAllStudents] = useState([]); // full unfiltered list for counts
  const [pagination, setPagination]   = useState(null);
  const [queryParams, setQueryParams] = useState({ page: 1, limit: 10, search: "", course: "all" });
  const [globalLoading, setGlobalLoading] = useState(true); // true until first fetch done
  const hasFetchedAll = useRef(false);

  // Fetch ALL students once on mount (for counts, stats, etc.)
  // This runs silently in the background
  const fetchAllStudents = useCallback(async () => {
    if (hasFetchedAll.current) return;
    hasFetchedAll.current = true;
    try {
      const res = await api.getStudents({ page: 1, limit: 500, course: "all" });
      setAllStudents(res.data.students || []);
    } catch (err) {
      console.error("fetchAllStudents error:", err);
    }
  }, []);

  // Fetch paginated/filtered students for list views
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

      // Also refresh allStudents so counts stay in sync after enroll/delete
      hasFetchedAll.current = false;
      fetchAllStudents();
    } catch (err) {
      console.error("fetchStudents error:", err);
    }
  }, [queryParams, fetchAllStudents]);

  // On mount: fetch both the paginated list AND the full list
  useEffect(() => {
    const init = async () => {
      setGlobalLoading(true);
      try {
        const [listRes, allRes] = await Promise.all([
          api.getStudents({ page: 1, limit: 10 }),
          api.getStudents({ page: 1, limit: 500, course: "all" }),
        ]);
        setStudents(listRes.data.students);
        setPagination(listRes.data.pagination);
        setAllStudents(allRes.data.students || []);
        hasFetchedAll.current = true;
      } catch (err) {
        console.error("init fetch error:", err);
      } finally {
        setGlobalLoading(false);
      }
    };
    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Enrollment count per course — always computed from allStudents
  const enrolledMap = {};
  allStudents.forEach((s) => {
    if (s.course) enrolledMap[s.course] = (enrolledMap[s.course] || 0) + 1;
  });

  return (
    <StudentContext.Provider value={{
      students,
      allStudents,
      enrolledMap,
      pagination,
      queryParams,
      globalLoading,
      fetchStudents,
      fetchAllStudents,
    }}>
      {children}
    </StudentContext.Provider>
  );
};