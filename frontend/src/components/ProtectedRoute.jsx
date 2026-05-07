import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AuthPage from "../pages/AuthPage";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="full-page-loader">
        <div className="page-spinner" />
      </div>
    );
  }

  return user ? children : <AuthPage />;
};

export default ProtectedRoute;