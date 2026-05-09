import { createContext, useState, useCallback, useEffect, useRef } from "react";
import * as api from "../services/studentService";

export const StudentContext = createContext();

export const StudentProvider = ({ children, authReady, token }) => {
  const [students, setStudents]       = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [pagination, setPagination]   = useState(null);
  const [queryParams, setQueryParams] = useState({ page: 1, limit: 10, search: "", course: "all" });
  const [globalLoading, setGlobalLoading] = useState(true);
  const initializedRef = useRef(false);

  // Build enrolledMap from allStudents — always fresh
  const enrolledMap = {};
  allStudents.forEach((s) => {
    if (s.course) enrolledMap[s.course] = (enrolledMap[s.course] || 0) + 1;
  });

  // Core fetch: paginated list for table views
  const fetchStudents = useCallback(async (params) => {
    const p = params || queryParams;
    try {
      const cleanParams = {
        page:  p.page  || 1,
        limit: p.limit || 10,
        ...(p.search && { search: p.search }),
        ...(p.course && p.course !== "all" && { course: p.course }),
      };
      const res = await api.getStudents(cleanParams);
      setStudents(res.data.students);
      setPagination(res.data.pagination);
      setQueryParams(p);

      // Refresh full list so counts stay in sync after enroll/delete
      const allRes = await api.getStudents({ page: 1, limit: 500, course: "all" });
      setAllStudents(allRes.data.students || []);
    } catch (err) {
      console.error("fetchStudents error:", err);
    }
  }, [queryParams]);

  // Only run the initial fetch AFTER auth is ready (token attached to axios)
  useEffect(() => {
    // authReady = AuthContext has finished restoring the session
    // token     = truthy means user is logged in
    if (!authReady) return;          // still checking session — wait
    if (!token) {                    // not logged in — nothing to fetch
      setGlobalLoading(false);
      return;
    }
    if (initializedRef.current) return; // already fetched — skip
    initializedRef.current = true;

    const init = async () => {
      setGlobalLoading(true);
      try {
        const [listRes, allRes] = await Promise.all([
          api.getStudents({ page: 1, limit: 10 }),
          api.getStudents({ page: 1, limit: 500, course: "all" }),
        ]);
        setStudents(listRes.data.students   || []);
        setPagination(listRes.data.pagination);
        setAllStudents(allRes.data.students || []);
      } catch (err) {
        console.error("init fetch error:", err);
      } finally {
        setGlobalLoading(false);
      }
    };

    init();
  }, [authReady, token]); // re-runs when auth state settles

  return (
    <StudentContext.Provider value={{
      students,
      allStudents,
      enrolledMap,
      pagination,
      queryParams,
      globalLoading,
      fetchStudents,
    }}>
      {children}
    </StudentContext.Provider>
  );
};