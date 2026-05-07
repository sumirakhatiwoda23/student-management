import { useContext, useState, useEffect, useCallback } from "react";
import { StudentContext } from "../context/StudentContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { deleteStudent } from "../services/studentService";
import Pagination from "./Pagination";

const SORT_OPTIONS = [
  { value: "name-asc",   label: "Name A→Z" },
  { value: "name-desc",  label: "Name Z→A" },
  { value: "age-asc",    label: "Age ↑" },
  { value: "age-desc",   label: "Age ↓" },
  { value: "course-asc", label: "Course A→Z" },
];

const AVATAR_URL = "http://localhost:5000/uploads/profiles/";

const StudentList = () => {
  const { students, pagination, queryParams, fetchStudents } = useContext(StudentContext);
  const { user } = useContext(AuthContext); // ← get logged-in user
  const isAdmin = user?.role === "admin";  // ← check if admin

  const navigate = useNavigate();
  const [search, setSearch]         = useState("");
  const [courseFilter, setCourse]   = useState("all");
  const [sort, setSort]             = useState("name-asc");
  const [deletingId, setDeletingId] = useState(null);
  const [viewMode, setViewMode]     = useState("table");

  // Debounced fetch on filter change
  useEffect(() => {
    const t = setTimeout(() => {
      fetchStudents({ ...queryParams, page: 1, search, course: courseFilter });
    }, 300);
    return () => clearTimeout(t);
  }, [search, courseFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch on mount
  useEffect(() => { fetchStudents({ page: 1, limit: 10, search: "", course: "all" }); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePageChange = useCallback((page) => {
    fetchStudents({ ...queryParams, page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [fetchStudents, queryParams]);

  const handleDelete = async (id) => {
    setDeletingId(id);
    await deleteStudent(id);
    await fetchStudents(queryParams);
    setDeletingId(null);
  };

  const clearFilters = () => { setSearch(""); setCourse("all"); };

  // Client-side sort (server returns paginated chunk)
  const sorted = [...students].sort((a, b) => {
    const [field, dir] = sort.split("-");
    const av = field === "age" ? Number(a[field] || 0) : (a[field] || "").toLowerCase();
    const bv = field === "age" ? Number(b[field] || 0) : (b[field] || "").toLowerCase();
    if (av < bv) return dir === "asc" ? -1 : 1;
    if (av > bv) return dir === "asc" ? 1 : -1;
    return 0;
  });

  const getInitials = (name) =>
    name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "?";

  const AVATAR_COLORS = ["#f59e0b","#10b981","#8b5cf6","#06b6d4","#f43f5e","#3b82f6"];
  const getColor = (name) => AVATAR_COLORS[(name?.charCodeAt(0) || 0) % AVATAR_COLORS.length];

  const AvatarImg = ({ student, size = 36, className = "avatar" }) =>
    student.avatar ? (
      <img
        src={`${AVATAR_URL}${student.avatar}`}
        alt={student.name}
        className={className}
        style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
        onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
      />
    ) : null;

  const AvatarFallback = ({ student, size = 36, className = "avatar" }) => (
    <div
      className={className}
      style={{ background: getColor(student.name), width: size, height: size,
               display: student.avatar ? "none" : "flex" }}
    >
      {getInitials(student.name)}
    </div>
  );

  return (
    <div className="list-wrapper">
      {/* Toolbar */}
      <div className="toolbar">
        <div className="search-wrap">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" strokeLinecap="round"/>
          </svg>
          <input className="search-input" placeholder="Search students…"
            value={search} onChange={(e) => setSearch(e.target.value)} />
          {search && <button className="search-clear" onClick={() => setSearch("")}>×</button>}
        </div>

        <div className="toolbar-right">
          <select className="select-filter" value={sort} onChange={(e) => setSort(e.target.value)}>
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>

          <div className="view-toggle">
            <button className={`view-btn ${viewMode === "table" ? "active" : ""}`} onClick={() => setViewMode("table")} title="Table">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M3 9h18M3 15h18M9 3v18" strokeLinecap="round"/>
              </svg>
            </button>
            <button className={`view-btn ${viewMode === "grid" ? "active" : ""}`} onClick={() => setViewMode("grid")} title="Grid">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Results info */}
      <div className="results-info">
        <span>
          {pagination
            ? `${pagination.total} student${pagination.total !== 1 ? "s" : ""} total`
            : `${students.length} student${students.length !== 1 ? "s" : ""}`}
        </span>
        {(search || courseFilter !== "all") && (
          <button className="clear-filters" onClick={clearFilters}>Clear filters</button>
        )}
      </div>

      {/* Empty state */}
      {sorted.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" width="48" height="48">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" strokeLinecap="round"/>
            </svg>
          </div>
          <p>No students found</p>
          <span>Try adjusting your search or filters</span>
        </div>
      )}

      {/* ── Table View ── */}
      {viewMode === "table" && sorted.length > 0 && (
        <div className="table-wrap">
          <table className="student-table">
            <thead>
              <tr>
                <th>Student</th><th>Email</th><th>Age</th><th>Course</th>
                <th>{isAdmin ? "Actions" : "Action"}</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((student, i) => (
                <tr key={student._id} style={{ animationDelay: `${i * 30}ms` }} className="table-row">
                  <td>
                    <div className="student-cell">
                      <AvatarImg student={student} />
                      <AvatarFallback student={student} />
                      <span className="student-name">{student.name}</span>
                    </div>
                  </td>
                  <td><span className="email-cell">{student.email}</span></td>
                  <td><span className="age-badge">{student.age}</span></td>
                  <td><span className="course-badge">{student.course}</span></td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-edit" onClick={() => navigate(`/edit/${student._id}`)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeLinecap="round"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                        Edit
                      </button>

                      {/* ← Only show Delete button for admin */}
                      {isAdmin && (
                        <button
                          className={`btn-delete ${deletingId === student._id ? "loading" : ""}`}
                          onClick={() => handleDelete(student._id)}
                          disabled={deletingId === student._id}
                        >
                          {deletingId === student._id ? <span className="spinner" /> : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                              <polyline points="3 6 5 6 21 6" strokeLinecap="round"/>
                              <path d="M19 6l-1 14H6L5 6" strokeLinecap="round"/>
                              <path d="M10 11v6M14 11v6" strokeLinecap="round"/>
                              <path d="M9 6V4h6v2" strokeLinecap="round"/>
                            </svg>
                          )}
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Grid View ── */}
      {viewMode === "grid" && sorted.length > 0 && (
        <div className="student-grid">
          {sorted.map((student, i) => (
            <div key={student._id} className="student-card" style={{ animationDelay: `${i * 40}ms` }}>
              {student.avatar ? (
                <img src={`${AVATAR_URL}${student.avatar}`} alt={student.name}
                  className="card-avatar-img"
                  onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
              ) : null}
              <div className="card-avatar" style={{ background: getColor(student.name),
                display: student.avatar ? "none" : "flex" }}>
                {getInitials(student.name)}
              </div>
              <h3 className="card-name">{student.name}</h3>
              <p className="card-email">{student.email}</p>
              <div className="card-meta">
                <span className="course-badge">{student.course}</span>
                <span className="age-badge">Age {student.age}</span>
              </div>
              <div className="card-actions">
                <button className="btn-edit" onClick={() => navigate(`/edit/${student._id}`)}>Edit</button>

                {/* ← Only show Delete button for admin */}
                {isAdmin && (
                  <button className={`btn-delete ${deletingId === student._id ? "loading" : ""}`}
                    onClick={() => handleDelete(student._id)} disabled={deletingId === student._id}>
                    {deletingId === student._id ? <span className="spinner" /> : "Delete"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
};

export default StudentList;